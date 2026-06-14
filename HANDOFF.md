# Badr Shaqer — session handoff

_Handoff for picking the project up in a fresh (e.g. local) Claude Code session._
_Written 2026-06-15. Active branch: **`rebuild-v2`** at commit **`ce12adf`**._

---

## What this is
Bilingual personal/advisor website for **Badr Shaqer** — **Arabic (RTL, primary)** + **English** (`/en/`).
Astro multi-page site, dark/warm "operator" aesthetic, heavy motion.

- **Live:** https://zaka33333-hash.github.io/badrshaqer-website/ (EN at `/en/`)
- **Repo:** `zaka33333-hash/badrshaqer-website`
- **Active branch:** **`rebuild-v2`** ← everything ships from here.
  `main` = the *archived* old single-page site (don't develop there).
- **Deploy:** GitHub Actions on push to `rebuild-v2` → builds Astro → GitHub Pages (~1 min). No manual step.
- **Stack:** Astro 5 · GSAP · Lenis · View Transitions. Self-hosted fonts (EN = General Sans; AR = Reem Kufi / Alexandria / IBM Plex Arabic). Playwright (dev) for screenshots. Node 22.

## Run it locally
```
npm ci
npm run dev        # local dev
# or: npm run build && npm run preview
```
Push to `rebuild-v2` to deploy.

## Layout
- `src/pages/` — 17 routes: home, story, articles, book, consultation, programs/{become-a-consultant, systemize-your-business}, apply, 404 — each in AR (root) + EN (`/en/`).
- `src/components/` — HomePage, PageHero, ProgramPage, BookPage, ConsultationPage, StoryPage, ArticlesPage, ApplyForm, Footer, Marquee, SegHead, Split, Arrow, CtaBand.
- `src/layouts/Base.astro` — shell: head/SEO, hreflang, OG/Twitter, JSON-LD, nav, full-screen menu, custom cursor, footer.
- `src/data/` — `site.js` (config/links/paths), `copy/{home,inner,shared,apply}.js`, `ld.js` (JSON-LD builders).
- `src/styles/` — tokens, base, shell, home, inner, elevate, apply, fonts/.
- `src/scripts/` — core.js, home.js, inner.js, transitions.js, apply.js.
- `public/assets/` — images, fonts, manifests, robots.txt, sitemap.xml.

## Conventions / gotchas (important)
- **Two-tone system:** `--ink` (#0d0b07) + `--surface` (#f5f0e6). Sections set `data-theme="dark|light"`; the scroll observer sets `body[data-bg]`, now wired to the body/canvas background (fixes overscroll flash).
- **Numerals: keep Western/Latin in BOTH languages** (owner preference — Arabic-Indic was tried and reverted).
- **RTL:** AR is primary at root, EN at `/en/`. Use logical props (`inset-inline-*`, `margin-inline`) for layout — BUT 3D transforms (`rotateY`, `transform-origin: left/right`) are physical and DON'T flip with `dir`. For 3D use physical `left/right` + an explicit RTL mirror (see book + `flipRtl`).
- **Arabic typography:** `letter-spacing` breaks Arabic joins → handled via `:lang(ar) .t-mono`. The SegHead reveal mask `.line-mask` needs top+bottom padding or it clips Arabic ascenders (hamza/dots).
- **Portrait backdrops:** `PageHero` takes `photo` + `flipRtl`; `.pagehero__backdrop--fliprtl` sets object-position and mirrors (`scaleX(-1)`) in RTL so the subject sits opposite the text. Photos used: `consultation-thinking.webp`, `program-consultant.webp`, `program-systemize.webp`, plus `hero-photo`, `whyme-photo`, `badr-portrait-photo` (promise).
- **Verify before push:** Playwright screenshots desktop+mobile, AR+EN (in a local session you can just open the browser instead).

## Done this session (on `rebuild-v2`)
- Home: swapped Publication ↔ Why-Me order.
- SEO: fixed a broken structured-data image path (was missing the deploy base, 404'd); added Organization + BreadcrumbList (every inner page) + FAQPage (program pages).
- Identity: hero editorial "folio" masthead (المبادر · منشور الأعمال · 2026); signature motion (folio rules draw in; marquee scroll-velocity skew); tapered section dividers.
- **Redesigned the 3 flat sections** → editorial: **Statement** (signed manifesto), **Promise** (dark→light two-column portrait pitch), **Services** (dark→light, asymmetric header + light cards).
- Nav logo → round (was a squircle showing dark corners). Mobile footer meta centered/tidied.
- Fixes: Arabic headline clipping (`.line-mask` padding), RTL book 3D glitch (physical left/right), white overscroll strip (`body[data-bg]` bg).
- Perf: LCP preload for hero images.
- **Portraits** added to consultation + both program heroes (`flipRtl`).
- **Book:** iterated CSS realism → photoreal render → **transparent cut-out** (`book-3d.webp`, via `rembg`) + CSS drop-shadow/float → **re-cut from the full-res lossless original**. EN uses the cut-out (book page + home teaser); AR keeps the (improved) CSS book with the Arabic cover.

## Open items / next steps
1. **Arabic book cover** — AR still uses the CSS book (Arabic title). Needs an Arabic-cover render. AI butchers Arabic text → use a mockup template with a flat AR cover export, OR a blank-cover render + HTML text overlay. Then cut out → wire AR (per-language switch already exists in `BookPage.astro`).
2. **Desktop custom cursor is disabled by a bug (NOT fixed).** In `src/styles/shell.css`, the `@media (max-width: 720px)` block (~line 416) is missing its closing `}` — the file ends `}}`, so all the `.cursor` styles got swallowed into the mobile query and never apply on desktop. Fixing it restores the designed custom cursor; verify the feel before shipping.
3. **PR #1** targets `main` (the *archived* old site) with audit fixes — not deployed. Close it or port anything relevant.
4. **Stray file on `main`:** `public/assets/dreamina-2026-06-14-...png` (3 MB) was uploaded there to transfer the book original — clutter, safe to delete.
5. **Mobile portrait framing** crops a little tight to faces — optional `object-position` tuning per breakpoint.
6. **Apply form** `FORM_ENDPOINT` in `src/data/copy/apply.js` is a Formspree placeholder — needs a real form id to actually submit.
7. **Launch on badrshaqer.com:** set `base:'/'` + `site` in `astro.config.mjs` and `SITE.domain` in `src/data/site.js`. Canonical/OG/sitemap already point at badrshaqer.com.
8. Ongoing "push design to 10/10" — visual/type/motion/layout were lifted; more bold passes possible.

## Asset-transfer note (why we switched sessions)
In the cloud/web session, chat-pasted images are **downscaled + only live in the transcript** (no real file), and the cloud container can't see your Mac's Downloads. Full-res assets had to come via GitHub upload or a URL. **In a local session this disappears — files on your machine are directly accessible.** (`rembg` was used here for background removal; model caches at `~/.u2net/u2net.onnx`.)
