# Independent Audit Brief — Badr Shaqer personal site (bilingual)

> Hand this to a fresh agent opened **in the project directory** (`badrshaqer-website/`) so it can
> read the files and run a local server. It is self-contained. Throwaway doc — delete anytime.

You are a principal-level web auditor — front-end engineer, design director, performance
engineer, accessibility specialist, native-Arabic editor, and conversion strategist in one.
Perform an EXHAUSTIVE, EVIDENCE-BASED audit of this site and return a prioritized report.
This is a high-stakes personal brand for a working business advisor; the bar is "billion-dollar
quality, nothing generic." Be rigorous and honest — flattery is useless, but so is inventing
problems. EVERY finding must be backed by something you actually observed (a file:line, a
rendered screenshot, a console log, or a measured number). No hand-waving, no hallucinated issues.

I specifically want THREE things in balance:
1. What to IMPROVE — visually, in performance, and in functionality.
2. What should STAY — call out what is working well and must NOT be changed or "refactored away."
3. An independent second opinion on a recent polish pass (described below) — you may DISAGREE
   with any of those decisions; if so, argue it with evidence.

## PROJECT CONTEXT
- Who: Badr Shaqer, a business/marketing advisor for founders. Products: 1:1 consulting (booked
  via Calendly) and a book "How to Sell Like a Drug Dealer" (sold via zaap.bio, Arabic edition).
  He also runs Almobadir, a separate Arabic business publication the site cross-links to.
- STRATEGIC CONSTRAINT (NON-NEGOTIABLE): the brand is pan-MENA / pan-Arab. It must NEVER read as
  specifically Saudi to an external audience. Flag any copy, imagery, dialect, currency, or
  framing that narrows it to one country.
- Conversion goals, in order: (1) book a consulting call, (2) buy the book, (3) read/visit
  Almobadir. Judge everything against whether it moves a skeptical, sales-literate founder toward these.
- Audience: founders past the idea stage running real companies — busy, skeptical, sales-literate.
  Tone should be a confident operator, not a soft CMO.

## FILES (source of truth — audit the current working-tree state on disk)
- `/index.html` — Arabic, RTL, the primary/canonical version.
- `/en/index.html` — English, LTR, mirror.
- `/assets/` — portrait, Almobadir mark, book cover, interior, OG share cards, favicon/, lenis.min.js.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` at root.
- Intended production domain: badrshaqer.com. (Note: that domain currently serves a DIFFERENT,
  older version — confirm deployment intent; audit the local files, not the live domain.)
- Six sections, both files: hero → consulting (01) → book (02) → proof (03) →
  publication/Almobadir (04) → outro (05).
- External destinations to verify resolve and are correct: Calendly
  calendly.com/badrshaqer_consulting; book zaap.bio/badrshaqer/<arabic-slug>; almobadir.com;
  socials @badrshaqer (Instagram/TikTok/X); click-to-copy / mailto badr@almobadir.com.

## TECH STACK
Pure static vanilla HTML/CSS/JS, no build step, everything inlined in two .html files.
Lenis smooth-scroll (self-hosted). A WebGL fragment-shader "atmosphere" of animated metaball
blobs in the hero only (paused offscreen via IntersectionObserver). A custom JS interaction layer:
lerp cursor + trail (pointer:fine only), magnetic CTAs, 3D tilt, count-up numbers,
reveal-on-scroll, scroll-progress, a data-bg body state machine, anchor smooth-scroll, full-screen
frosted (backdrop-filter) menu, page loader. Fonts (Google Fonts): Reem Kufi, IBM Plex Sans Arabic,
Amiri (Arabic); Fraunces, Source Serif 4, Inter Tight (English); JetBrains Mono (labels).

## A POLISH PASS WAS JUST COMPLETED — verify each held, and judge whether it was the RIGHT call
(Treat these as claims to independently confirm or refute, not as settled facts.)
- Hero headline copy is solid color; the hero PROMISE + CREDENTIALS were switched from
  white `mix-blend-mode:difference` to solid cream over a soft dark radial "scrim" behind the copy
  column. (Verify worst-case contrast over the BRIGHTEST animation frames, both desktop and mobile.
  Does the scrim read as an intentional vignette or a smudge?)
- The hero→consulting "sunset" gradient strip was REMOVED; the dark hero now meets the cream
  consulting section on a hard ink→cream cut. (Is the hard cut clean, or does it need a subtle bridge?)
- The full-screen page-frame border (a thin rounded outline around the viewport) was REMOVED.
- The page-loader's progress line was moved off the centered wordmark to the bottom edge.
- CTAs got: a dimensional fill + lit top edge, a warm glow-lift on hover, a light-sweep sheen,
  a press (:active) state, and a branded :focus-visible ring. (Tasteful, or too much?)
- The custom cursor got: a softer warm "trail", and a glassy translucent+blurred "lens" for the
  button-hover state (the old solid disc was invisible over the carmine CTA). (Is the custom cursor
  a net positive or friction? Is the lens visible enough over carmine / cream / dark?)
- Accessibility: the closed menu is now `inert` (its links were previously tabbable while hidden);
  on open, focus moves into the menu, Tab is trapped, Esc/close restores focus to the toggle.
- Reduced-motion: WebGL, Lenis, magnetic, tilt, cursor, and trail are now gated behind
  prefers-reduced-motion. (Confirm ALL motion is actually suppressed and the page stays coherent.)
- Touch targets (hamburger, contact pills) raised to >=44px.
- Performance: images recompressed (WebP), Lenis self-hosted (no CDN), unused font weight trimmed.
- SEO/share: added hreflang (ar/en/x-default) + canonical, robots.txt, sitemap.xml,
  site.webmanifest, Person/Book/WebSite JSON-LD, and branded 1200x630 OG cards (og-ar.jpg/og-en.jpg).
- Content: proof numbers restructured to four DISTINCT metrics — 200+ founders advised 1:1 /
  3M+ readers / 5K+ newsletter subscribers / 10+ years. (Credible? Internally consistent AR vs EN?)
- Known NOT done (judge whether they matter): fonts still load from Google Fonts (not self-hosted);
  the two HTML files still duplicate ~2000 lines of shared CSS/JS; no real-Safari verification.

## METHODOLOGY — actually test it, don't just read the code
1. Read both files in full (inline `<style>` and `<script>`) before judging.
2. Serve locally (e.g. `python3 -m http.server`) and render headlessly (Playwright/Puppeteer).
   Screenshot EVERY section in BOTH languages at 375, 414, 768, 1024, 1440, 1920 px. Mobile/tablet
   are mandatory.
3. Capture console errors/warnings and failed network requests, on load and during scroll, both files.
4. Exercise interactions: open/close menu (toggle, Esc, link, keyboard-trap), hover/press/focus every
   CTA, the cursor states, 3D tilt, scroll to trigger reveals + count-up + the WebGL pause/resume.
5. Toggle prefers-reduced-motion:reduce and re-test — confirm motion is suppressed and layout holds.
6. Keyboard-only pass in both languages: logical focus order, visible focus, menu focus management,
   nothing reachable-but-invisible or invisible-but-reachable.
7. Measure: total weight + per-asset sizes, font payload, LCP/CLS, WebGL frame cost; note render-blocking.
8. Measure color contrast of ALL text — especially the hero promise/credentials over the animated
   atmosphere (sample the worst frames) and anything using mix-blend-mode. Give contrast ratios.
9. Validate the HTML; sanity-check the JSON-LD, hreflang, canonical, OG/Twitter tags, sitemap, manifest.
10. Diff AR vs EN structurally — every feature, section, link, count, and attribute should have its
    correct counterpart; flag unintended drift.
11. Note cross-browser risks you cannot fully test here (real Safari: backdrop-filter, mix-blend-mode,
    mask-image, WebGL) and mark them "needs manual check."

## DIMENSIONS TO COVER
Visual design & polish · Performance & loading · Functionality & interaction quality ·
Accessibility (WCAG 2.2 AA) · Responsive design · Cross-browser robustness · SEO & shareability ·
Arabic language quality (judge as a native editor: no calques, no tashkeel overload, pan-MENA
MSA-light register, correct font usage, numeral consistency) · Bilingual parity & RTL correctness
(mirrored layout, directional icons/arrows, mixed LTR-in-RTL runs) · Content, copy & conversion
(CTA clarity/frequency/friction; trust signals credible & consistent; testimonials non-generic &
pan-MENA) · Security & privacy (rel=noopener, clipboard, no leaked PII/secrets, third-party calls) ·
Code quality & maintainability (dead code, magic numbers, AR/EN drift, observer cleanup, WebGL
init-failure path).

## SEVERITY
P0 Critical (broken/illegible/a11y-blocker/broken link/lost conversion/breaks on mobile) ·
P1 High · P2 Medium · P3 Low/nit · Subjective (clearly label taste vs defect).

## OUTPUT
1. Executive summary — overall verdict + an honest 1–10 rating + the top 5 things to fix first.
2. Findings by dimension — each finding: stable ID, severity, exact location (file:line and/or
   section + viewport + language), the EVIDENCE you observed, the impact, a concrete recommended fix
   (show the code/copy change), and a rough effort (S/M/L).
3. KEEP AS-IS — an explicit list of what is working well and should NOT be changed (I want this).
4. Bilingual parity matrix — a compact AR-vs-EN diff of any divergence.
5. Prioritized fix queue — all findings sorted P0→P3 as a punch list.
6. Open questions for the owner — unverifiable claims, intended domain/deploy, missing assets.

## RULES OF ENGAGEMENT
- Verify before you assert. If you didn't observe it, don't claim it. Mark untested items
  "needs manual check."
- No false positives — a wrong P0 destroys trust in the whole report.
- Be specific and actionable; separate defects from taste; respect the pan-MENA and operator-voice
  constraints when judging copy.
- This is read/measure/report only — do NOT edit the files. Hand back a plan, not a diff,
  unless explicitly asked to fix afterward.
