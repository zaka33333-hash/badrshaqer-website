// ═══════════════ CORE · every page ═══════════════
// Lenis, loader, nav state, menu, cursor, magnetic, reveals, count-ups.
// Everything motion-related is gated behind prefers-reduced-motion.
import Lenis from 'lenis';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

export { reduceMotion, finePointer };

/* ── Lenis smooth scroll ── */
export let lenis = null;
if (!reduceMotion) {
  lenis = new Lenis({ smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.5, lerp: 0.085 });
  const raf = (t) => { lenis?.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  window.__lenis = lenis;
}

/* ── Global Scroll Listeners (Registered ONCE to avoid duplication) ── */
let scrollProgressEl = null;
let scrollRaf = 0;
const updateScrollProgress = () => {
  scrollRaf = 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? (scrollY / max) : 0;
  if (scrollProgressEl) {
    scrollProgressEl.style.setProperty('--p', pct.toFixed(4));
  }
  document.documentElement.style.setProperty('--scroll-percent', `${(pct * 100).toFixed(2)}%`);
};

let pillnavEl = null;
let contactPillsEl = null;
let lastY = 0;
const updatePillNav = () => {
  if (!pillnavEl && !contactPillsEl) return;
  const down = scrollY > lastY && scrollY > 140;
  pillnavEl?.classList.toggle('is-hidden', down);
  contactPillsEl?.classList.toggle('is-hidden', down);
  lastY = scrollY;
};

// Register global scroll listeners
addEventListener('scroll', () => {
  if (!scrollRaf) scrollRaf = requestAnimationFrame(updateScrollProgress);
  updatePillNav();
}, { passive: true });



// Helper to format statistics numbers
const fmt = (n, abbr) => {
  if (abbr && n >= 1000000) return `${Math.round(n / 100000) / 10}M`.replace('.0', '');
  if (abbr && n >= 1000) return `${Math.round(n / 100) / 10}K`.replace('.0', '');
  return String(n);
};

/* ── Initialize Page Features on View Transitions ── */
document.addEventListener('astro:page-load', () => {
  // Sync core elements in new DOM
  scrollProgressEl = document.querySelector('.scroll-progress');
  pillnavEl = document.querySelector('.pillnav');
  contactPillsEl = document.querySelector('.contact-pills');


  updateScrollProgress();

  // 1. Page Loader (Only runs if element is present in new DOM)
  const loader = document.getElementById('loader');
  if (loader) {
    const line = loader.querySelector('.loader__line');
    const pct = loader.querySelector('.loader__pct');
    if (reduceMotion || window.__initialLoadDone) {
      loader.remove();
      document.dispatchEvent(new CustomEvent('loader:done'));
    } else {
      window.__initialLoadDone = true;
      document.documentElement.style.overflow = 'hidden';
      let progress = 0;
      let target = 0.12;
      const t0 = performance.now();
      const tick = () => {
        progress += (target - progress) * 0.08;
        if (line) line.style.transform = `scaleX(${progress})`;
        if (pct) pct.textContent = `${Math.round(progress * 100)}%`;
        if (progress < 0.995) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      const finish = () => {
        target = 1;
        const dwell = Math.max(0, 1450 - (performance.now() - t0));
        setTimeout(() => {
          loader.classList.add('is-gone');
          document.documentElement.style.overflow = '';
          document.dispatchEvent(new CustomEvent('loader:done'));
          setTimeout(() => loader.remove(), 1100);
        }, dwell + 250);
      };
      window.addEventListener('load', () => { target = 0.92; finish(); });
      setTimeout(finish, 3200);
    }
  } else {
    document.dispatchEvent(new CustomEvent('loader:done'));
  }

  // 2. Reveal Observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('[data-reveal], .split-mask').forEach((el) => revealObserver.observe(el));

  // 3. HUD Theme Awareness
  const themedSections = document.querySelectorAll('[data-theme]');
  if (themedSections.length) {
    const bgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) document.body.setAttribute('data-bg', e.target.getAttribute('data-theme'));
        });
      },
      { rootMargin: '-12% 0px -78% 0px', threshold: 0 }
    );
    themedSections.forEach((s) => bgObserver.observe(s));
  }

  // 4. Full-Screen Menu
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');
  if (menuToggle && menuPanel) {
    const links = menuPanel.querySelectorAll('a');
    links.forEach((a, i) => a.style.setProperty('--d', `${80 + i * 45}ms`));
    menuPanel.inert = true;
    const background = ['main', 'footer', '.pillnav', '.contact-pills', '.skip-link']
      .map((s) => document.querySelector(s))
      .filter(Boolean);
    const close = (refocus = true) => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('is-open');
      menuPanel.classList.remove('is-open');
      menuPanel.inert = true;
      background.forEach((el) => { el.inert = false; });
      lenis?.start();
      if (refocus) menuToggle.focus();
    };
    const open = () => {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.classList.add('is-open');
      menuPanel.classList.add('is-open');
      menuPanel.inert = false;
      background.forEach((el) => { el.inert = true; });
      lenis?.stop();
      links[0]?.focus();
    };
    menuToggle.addEventListener('click', () =>
      menuToggle.getAttribute('aria-expanded') === 'true' ? close() : open()
    );
    links.forEach((a) => a.addEventListener('click', () => close(false)));
    
    // Auto-close menu on dynamic navigations
    document.addEventListener('astro:before-preparation', () => { close(false); }, { once: true });

    document.addEventListener('keydown', (e) => {
      if (!menuPanel.classList.contains('is-open')) return;
      if (e.key === 'Escape') return close();
      if (e.key === 'Tab') {
        const focusables = [menuToggle, ...menuPanel.querySelectorAll('a, button')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }



  // 6. Magnetic Elements
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      let rect = null;
      el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; rect = null; });
      el.addEventListener('mousemove', (e) => {
        if (!rect) return;
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
      });
    });
  }

  // 6b. 3D Tilt Elements
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      let rect = null;
      el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; rect = null; });
      el.addEventListener('mousemove', (e) => {
        if (!rect) return;
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = -(y / (rect.height / 2)) * 8; // max 8 degrees tilt
        const ry = (x / (rect.width / 2)) * 8;
        el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
      });
    });
  }

  // 7. Click-to-copy email
  document.querySelectorAll('[data-copy-email]').forEach((el) => {
    const email = el.getAttribute('data-copy-email');
    const copiedLabel = el.getAttribute('data-copied-label') || 'Copied';
    el.addEventListener('click', (e) => {
      if (!navigator.clipboard) return;
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        const span = el.querySelector('span') || el;
        const prev = span.textContent;
        span.textContent = copiedLabel;
        el.classList.add('is-copied');
        setTimeout(() => { span.textContent = prev; el.classList.remove('is-copied'); }, 1600);
      });
    });
  });

  // 8. Count-ups (Stats)
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const abbr = el.hasAttribute('data-abbr');
    const final = `${prefix}${fmt(target, abbr)}${suffix}`;
    if (reduceMotion) { el.textContent = final; return; }
    new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const duration = 1700;
        const start = performance.now();
        const animate = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = `${prefix}${fmt(Math.round(target * eased), abbr)}${suffix}`;
          if (p < 1) requestAnimationFrame(animate);
          else el.textContent = final;
        };
        requestAnimationFrame(animate);
      });
    }, { threshold: 0.4 }).observe(el);
  });

  // 9. Same-page Anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && lenis) {
        const target = document.querySelector(id);
        if (target) { e.preventDefault(); lenis.scrollTo(target, { duration: 1.4 }); }
      }
    });
  });

  lenis?.resize();
});
