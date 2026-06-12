# badrshaqer.com — bilingual multi-page rebuild (v2)

Personal-brand site for **Badr Shaqer** — founder advisor / business consultant.
Arabic (RTL) is the primary language at `/`; English mirrors every page under `/en/`.
Craft bar: [juanmora.co](https://juanmora.co) — structure follows the owner's 12-frame mock.

## Stack

- **[Astro](https://astro.build)** (static output) — components/layouts are the AR/EN sharing mechanism
- **GSAP 3.13** — ScrollTrigger (pinning, parallax, scrub), Draggable + Inertia (hero shapes, testimonial strip)
- **Lenis** — smooth scroll (`lerp: 0.085`)
- Self-hosted, per-script subset fonts (no CDN at runtime)

## Run / build / deploy

```bash
npm install
npm run dev        # local dev at :4321
npm run build      # static site → dist/
npm run preview    # serve dist/
```

Deploy: any static host. `.github/workflows/deploy.yml` ships `dist/` to GitHub Pages
on push to `main` (set Pages → Source → GitHub Actions; custom domain stays in repo settings).
Vercel/Netlify: build command `npm run build`, output `dist`.

```bash
node scripts/shoot.mjs / 1440 900 label        # screenshot harness (serves dist/, scrolls, captures console)
node scripts/fetch-fonts.mjs                   # re-download font subsets (committed; rerun only to change families)
```

## How AR and EN share code

One component tree renders both languages:

- `src/data/copy/*.js` — every string, `{ ar: …, en: … }`. **Blocks marked APPROVED are
  verbatim from the owner's approved copy — do not edit them.**
- `src/components/*Page.astro` — page sections take a `lang` prop and read from the copy dicts.
- `src/pages/…` (AR at root) and `src/pages/en/…` are thin wrappers: same component, different `lang`.
- RTL/LTR is automatic: `src/styles/` uses CSS **logical properties** (`inset-inline-*`,
  `margin-inline`, `padding-inline`) and a `:lang(ar)` token remap
  (`--font-display`, `--font-statement`, `--font-body`, `--font-quote`) in `tokens.css`.
  Directional glyphs (arrows) flip via `[dir='rtl'] svg { transform: scaleX(-1) }`.

One fix in a component/stylesheet lands in both languages by construction.

## Animation architecture

| Layer | File | What it does |
|---|---|---|
| Reveal library | `styles/base.css` + `scripts/core.js` | `data-reveal="rise-slow\|rise-fast\|fade\|scale\|clip-up\|from-side"` + IntersectionObserver; word-mask splits rendered **server-side** (`Split.astro` / `SegHead.astro`) so Arabic never breaks cursive joining (words-only splitting for AR; chars allowed for Latin) |
| Core motion | `scripts/core.js` | Lenis, loader (real progress + min dwell), nav hide-on-scroll, full-screen menu (focus trap + `inert`), custom cursor (lerp, labels: BOOK/READ/DRAG/COPY…), magnetic CTAs, click-to-copy email, count-ups |
| Home choreography | `scripts/home.js` | hero intro timeline (name glyphs rise after loader event), hero exit scrub (name splits apart + backdrop sinks), **pinned** statement build, draggable inertia shapes, testimonial drag strip, ghost-numeral parallax, floating 3D book, WebGL atmosphere (warm brand blobs) |
| Inner pages | `scripts/inner.js` | ghost numerals parallax + floating book only |

**Reduced motion**: `prefers-reduced-motion` kills Lenis, GSAP init, cursor, loader, WebGL,
parallax, and count-ups (static final values) — enforced in both CSS (`base.css`) and JS guards.
No-JS: reveal-hiding is scoped under `html.js`, so content is fully visible without JavaScript.

## Where to drop owner assets

| Asset | Drop at | Currently |
|---|---|---|
| Hero photo of Badr | `public/assets/hero-photo.webp` | AI-generated from owner's reference portrait (swap with a real shoot anytime) |
| Why-me full-bleed photo | `public/assets/whyme-photo.webp` (mirrored automatically in RTL) | AI-generated profile shot |
| Story hero photo | `public/assets/story-hero.webp` | AI-generated silhouette |
| Articles archive (titles/slugs/bodies/source) | `src/data/copy/inner.js` → `articleTeasers` (marked `OWNER-TODO`) | 6 unlinked "coming soon" topic cards |
| Program 1/2 curriculum + pricing + enroll flow | `src/data/copy/inner.js` → `programs` (marked `OWNER-TODO`) | "details on request" → email CTA |
| Per-page OG cards (1200×630) | `public/assets/og-*.jpg`, wire in each page's `ogImage` prop | site-wide `og-ar.jpg` / `og-en.jpg` |
| 3D/illustrated footer portrait | `public/assets/portrait-3d.webp` | AI-generated Pixar-style render |

## Structure

```
src/
├─ data/            site.js (links/paths) · copy/{shared,home,inner}.js · ld.js (JSON-LD)
├─ layouts/         Base.astro (SEO/hreflang/OG/JSON-LD + shell chrome)
├─ components/      Nav/menu/loader/cursor in Base · Footer · HomePage · StoryPage ·
│                   ArticlesPage · BookPage · ConsultationPage · ProgramPage ·
│                   Split/SegHead (cursive-safe text splitting) · CtaBand · PageHero
├─ pages/           AR at root, EN under en/ — 7 page types × 2 languages + 404
├─ scripts/         core.js · home.js · inner.js
└─ styles/          tokens.css · base.css · shell.css · home.css · inner.css · fonts/
public/             assets (images/favicons) · fonts (woff2 subsets) · robots · sitemap · manifests
legacy/             the previous single-page site (pre-rebuild), kept for reference
scripts/            fetch-fonts.mjs · shoot.mjs (screenshot harness) · crop/inspect helpers
```

See `SELF-AUDIT.md` for the verification results versus the build brief, including
the honest "not done / needs owner" list.
