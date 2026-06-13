// Branded page-transition wipe, coordinated with Astro's ClientRouter.
// Loaded once; the document listeners persist across navigations.
// On navigate: cover the screen with a carmine→ink panel from the bottom,
// wait for both the page fetch and the cover animation, swap, then reveal
// the new page by sliding the panel off the top.
const COVER_MS = 460;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const panel = () => document.querySelector('.page-wipe');

document.addEventListener('astro:before-preparation', (event) => {
  const el = panel();
  if (!el || reduced()) return;
  const original = event.loader;
  event.loader = async () => {
    el.classList.remove('is-revealing');
    void el.offsetWidth; // restart the transition
    el.classList.add('is-covering');
    await Promise.all([original(), wait(COVER_MS)]);
  };
});

document.addEventListener('astro:after-swap', () => {
  const el = panel();
  if (!el || reduced()) return;
  // new page is in place beneath the panel — reveal it from the top
  el.classList.remove('is-covering');
  void el.offsetWidth;
  el.classList.add('is-revealing');
  // once revealed, drop the class so the panel returns to its hidden idle
  // state (visibility:hidden) — no lingering sliver at the top edge
  el.addEventListener('transitionend', () => el.classList.remove('is-revealing'), { once: true });
});
