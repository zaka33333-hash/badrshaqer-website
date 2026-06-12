# Build Handoff — Badr Shaqer site (multi-page, "juanmora-grade or better")

> Paste this whole document to a top-tier coding/design model with browsing + a real dev
> environment (Vite/Node, a headless browser). It is self-contained. Build a **bilingual,
> multi-page** personal-brand site for **Badr Shaqer** whose craft matches or beats
> **https://juanmora.co/index.html**, following the owner's design mock.

---

## 0) ROLE & MISSION
You are a principal creative front-end engineer + design director. Ship a **multi-page**,
**bilingual (Arabic-RTL primary + English-LTR mirror)** site for **Badr Shaqer** — founder
advisor / business consultant — that feels **at least as polished, kinetic, and memorable as
juanmora.co** (buttery scroll, distinctive type, dense-but-tasteful motion, 60fps) **and** works
as a hard **conversion engine**. Match juanmora's *craft*; keep Badr's *brand*.

## 1) INPUTS — open all of these first
1. **Craft bar:** https://juanmora.co/index.html — study the motion, type, cursor, scroll shapes.
2. **The design mock (source of truth for structure & art direction):** the owner's deck
   (`Hero.pdf`, 12 frames). **Every "Juan Mora" frame is a LAYOUT PLACEHOLDER** — replace all Juan
   content/photos/copy with Badr's. The mock deliberately **alternates dark (Badr's ink/serif
   identity) and light (warm-cream, bold geometric-sans, juanmora energy)** sections.
3. **Existing site (brand + assets + approved copy):**
   `https://github.com/zaka33333-hash/badrshaqer-website` (live: `zaka33333-hash.github.io/badrshaqer-website/`).
   It already has Badr's palette, fonts, optimized assets, and **finalized Arabic + English copy** —
   reuse them. You may discard its implementation and rebuild.

**Precedence:** the mock = structure & art direction · juanmora = craft bar · existing repo =
brand, assets, finalized copy.

## 2) WHAT MAKES juanmora.co GREAT — reproduce every one at its level or better
- **Full-bleed cinematic photo hero** with a **giant name** treatment behind/over the subject.
- **Distinctive display type at huge scale**; **letter/word-by-letter staggered reveals**.
- **Lenis smooth scroll + GSAP ScrollTrigger** orchestrating pinning, parallax, and **floating
  geometric shapes** (circles/pills/hexagons/asterisks) that drift and are **draggable**.
- **Custom cursor** + **magnetic** elements + **click-to-copy email**.
- **High micro-interaction density**, never janky, always **60fps**; seamless section transitions.
- Editorial composition: asymmetry, overlap, big negative space, deliberate rhythm.
- A confident, human, slightly playful premium tone.
**Do NOT copy juanmora's palette or words.** Use Badr's identity (§5).

## 3) SITE ARCHITECTURE (from the mock's sitemap — frame 12) — build ALL of these, AR + EN
1. **Home / Landing** — the scrolling experience in §4.
2. **Story** — Badr's long-form about page (who he is, the operator origin story, credibility).
3. **Articles** — a blog/insight index ("150+ articles on selling & expertise") + article template.
   Decide the source with the owner (static MDX, a headless CMS, or pulling from Almobadir).
4. **Book landing page** — dedicated page for *"How to Sell Like a Drug Dealer"* (cover, why, sample
   chapter, buy → zaap.bio).
5. **Consultation landing page** — the 1:1 consulting offer in depth → Calendly booking.
6. **Program 1 — "Become a Consultant"** — productized course/program landing (promise, curriculum,
   outcome, pricing/enroll). *(Owner to supply details — see §11.)*
7. **Program 2 — "Systemize Your Business"** — second program landing. *(Owner to supply details.)*

Shared: a sticky **pill nav** (Story · logo · Work/Programs; right: Email / IG / X / TikTok), a
**full-screen menu**, a **page loader**, and a **footer/outro**. Use a small set of reusable
section components so the inner pages inherit the home's craft.

## 4) HOME PAGE — section by section (scroll order; reconcile with the mock if it differs)
1. **Hero (dark, cinematic):** full-bleed **photo of Badr** (operator at work — laptop/desk, warm
   low light). Over it: **giant "Badr Shaqer"** split-name treatment (cream + carmine), role labels
   **"Founder advisor & Marketing expert"** (top) and **"Business consultant"** (lower), the pill nav,
   contact links, and **floating, draggable colored circles** (juanmora's signature). A "scroll" cue.
2. **Statement (light cream, bold geometric sans):** **"10 years making rich founders richer."** with
   drifting geometric accents (a carmine asterisk, soft rounded rectangles) — parallax on scroll.
3. **Promise (dark, serif):** **"From zero to seven figures."** + the promise paragraph + credentials
   `BBA · MA MARKETING · 10+ YEARS` + CTAs **Book a consulting call** / **Read the book** + a "my story" link.
4. **Services hub (dark):** bilingual headline ("Close the gap between where you are and where you want
   to be with Badr Shaqer's proven systems." / Arabic: «مستشار في بناء المشاريع الاستشارية والتدريبية.
   رائد أعمال وكاتب.») + **3 entry cards**: **Book a consultation** (with a green "available" dot →
   Consultation page), **150+ articles on selling expertise** (→ Articles), **Services & packages**
   (→ Programs).
5. **Proof (light cream):** **"The numbers built by founders who worked with me."** + deck ("Ten years
   inside founder problems across MENA…") + stat row **200+ founders advised 1:1 · 3M+ readers · 5K+
   newsletter subscribers · 10+ years**, with a numbered side-rail and brass dividers.
6. **Testimonials:** real, specific, pan-MENA (Riyadh/Dubai/Cairo), role-attributed (NDA-safe).
7. **Consulting overview (light cream):** **"For founders tired of guessing."** + 4 steps
   (01 Pre-session diagnostic · 02 90 minutes on Zoom · 03 Written roadmap · 04 30-day follow-up) +
   a **dark booking card** (CONSULTING · 1 TO 1 — "I read the business before the call. Then we deal
   with the real problem." · DURATION 90 MIN / PLATFORM ZOOM / LANGUAGE EN-AR / FOLLOW-UP 30 DAYS ·
   **Book your call now →**) → Consultation page.
8. **Book teaser (light):** a **floating, animated book illustration** + the "drug dealer" angle +
   reasons + **Get your copy** → Book page / zaap.bio.
9. **About/why-me teaser (full-bleed photo):** **"Companies partner with me because of my
   perspective + sharp instincts"** + value bullets (premium direction · cares about craft · scalable
   systems · aligns to your goals) → Story page.
10. **Almobadir cross-link:** the publication ("the public work; this page is the private room") → almobadir.com.
11. **Footer / outro (dark):** giant **"Badr Shaqer"** name, a **stylized 3D/illustrated portrait or
    scene**, role + year, contact links, a "built with" credit line, and a final CTA.

## 5) BRAND & VISUAL SYSTEM
- **Spine = Badr's dark identity:** ink `#0d0b07`, cream `#f7f3ea`, **carmine `#c8281e`** (signature),
  carmine-deep `#8a1a13`, brass/`brass-pale` `#ad7d3a`/`#d4b483`. Editorial **serif** display (current
  site: Fraunces EN / Reem Kufi AR) + clean text faces + a mono for labels.
- **Counterpoint = light "juanmora" sections:** warm cream `~#EAE8E3` backgrounds, **bold geometric
  sans** (e.g. a Goga-like grotesque) for big statements, playful geometric shapes (carmine asterisk,
  cyan/navy/yellow/carmine circles, soft pink rounded rects). Alternate light/dark for rhythm.
- **Type:** keep distinctive display type; **self-host + subset** all fonts (don't ship 100 Google
  subsets). Letter-by-letter reveal needs the display font split into spans (GSAP SplitText or manual).
- **Assets you'll need (flag the missing ones to the owner — §11):** a **real cinematic photo of Badr**
  (hero + full-bleed statements), the existing **illustrated avatar** (secondary brand mark), an
  **animated book illustration**, a **stylized 3D/illustrated portrait** for the footer, the
  **Almobadir wordmark**, favicon set, and **branded 1200×630 OG cards per page/language**. Reuse and
  re-optimize assets from the repo; generate/source the rest.

## 6) CONTENT & COPY
- **Reuse the approved copy verbatim** from the repo for hero promise, consulting 4-step, proof stats,
  book section, testimonials. **Voice = confident operator, not soft CMO.**
- **Arabic must read native** — no calques, **no tashkeel/harakat**, pan-MENA MSA-light; Western digits
  used consistently; correct Arabic punctuation.
- **New copy needed** (Story long-form, Articles, Program 1/2 pages): write in the same operator voice,
  bilingual, and get facts from the owner. Don't invent metrics, testimonials, or program details.

## 7) BILINGUAL & RTL
- Ship Arabic (`/`, `dir=rtl lang=ar`, canonical) and English (`/en/…`) for **every page**.
- **Factor shared CSS/JS into common files** and drive language differences with CSS **logical
  properties** (`inset-inline-*`, `margin-inline`) + a few language tokens — one fix lands in both.
- RTL: mirror layout, the side-rail/HUD, and **all directional glyphs** (arrows must point correctly
  in RTL) — handle systematically, not per-element.

## 8) NON-NEGOTIABLES (where flashy sites fail — don't)
- **Accessibility (WCAG 2.2 AA):** real contrast everywhere **including text over photos/blend/motion**
  (measure worst frames; add scrims); full **`prefers-reduced-motion`** (kill Lenis, parallax, cursor,
  draggable shapes, count-ups, autoplay → static); keyboard-operable with visible focus; menu/overlays
  `inert` when closed + focus trap/return when open; tap targets ≥44px; alt text; captions if any video.
- **Performance:** fast on a mid phone — optimize/lazy-load media, **self-host+subset fonts**, no CDN
  SPOF, CLS≈0, strong LCP, **60fps** motion; gate heavy WebGL/3D on low-power/reduced-motion; code-split
  per page.
- **SEO/share:** reciprocal **hreflang (ar/en/x-default) + canonical** on every page, `robots.txt`,
  `sitemap.xml`, per-language `site.webmanifest`, **Person/Book/Article/Course + WebSite JSON-LD**,
  full OG/Twitter with per-page branded cards.
- **Conversion intact:** the **Book-a-call** path is always one obvious click away; motion must never
  bury the CTAs. Primary order: book call → buy book → programs → articles/Almobadir.
- **pan-MENA constraint (NON-NEGOTIABLE):** never reads as specifically Saudi — no Saudi currency,
  dialect, flags, or Vision framing; testimonial cities stay balanced (Riyadh/Dubai/Cairo).
- **Real destinations, wired exactly:** Calendly `calendly.com/badrshaqer_consulting`; book
  `zaap.bio/badrshaqer/كيف-تبيع-كتاجر-المخدرات`; `almobadir.com`; socials `@badrshaqer`
  (Instagram/TikTok/X); email `badr@almobadir.com`. All `target="_blank"` get `rel="noopener noreferrer"`.

## 9) TECH & ARCHITECTURE
- **Stack for the craft bar:** **GSAP (ScrollTrigger, SplitText, Draggable)** + **Lenis** + optional
  **Lottie/Spline** for the 3D footer/book. Build with **Vite** (or Astro for multi-page + content);
  output **static**, deployable to GitHub Pages / Vercel / Netlify. Vanilla is acceptable only if it
  truly hits 60fps and the motion bar.
- Componentize sections; share a layout + nav + footer across all 7 page types, AR & EN.
- Keep an honest **"built with"** note in the footer (GSAP, Lenis, etc.).

## 10) METHODOLOGY — build, then PROVE it (don't assume)
1. Build to the mock's structure at the juanmora craft bar.
2. **Render headlessly** (Playwright) and screenshot **every page & section, both languages**, at
   **375 / 414 / 768 / 1024 / 1440 / 1920px** (mobile/tablet mandatory). On phones the primary CTA
   must be reachable without hunting; centered, composed hero (the current site learned this the hard way).
3. Capture console + failed requests (must be clean). Measure weight, LCP, CLS, **animation FPS**.
4. **Measure text contrast** over photos/motion; fix every sub-AA case with scrims/solid colors.
5. Toggle reduced-motion and re-test; do a **keyboard-only** pass; verify focus management.
6. Mark what you couldn't test (real Safari `backdrop-filter`/`mix-blend-mode`/WebGL/3D) as "needs manual check."
7. Iterate until, side by side on a phone and a desktop, it is **clearly as good as or better than juanmora.co.**

## 11) OPEN QUESTIONS — get these from the owner before/while building
- A **real high-res photo (or two) of Badr** for the hero + full-bleed statement sections.
- **Program 1 (Become a Consultant)** and **Program 2 (Systemize Your Business):** promise, who it's
  for, curriculum/modules, outcome, **price**, and enrollment flow/links.
- **Articles:** the real content & where it lives (Almobadir? a CMS? static?), and whether "150+" is accurate.
- **Proof numbers & testimonials:** confirm they're real/attributable (200+ advised, 3M+ readers, 5K+
  subscribers, 10+ years) — don't ship unverifiable claims.
- **Consultation page:** keep Calendly, or a richer intake before booking?
- Confirm the **dark-spine + light-accent** art direction (recommended) vs going fully light like juanmora.

## 12) DELIVERABLES
- The built **bilingual multi-page** site (7 page types × AR/EN), responsive, animated to the bar,
  deploy-ready, with real links + SEO/manifests/JSON-LD.
- A **README**: animation architecture (GSAP timelines/ScrollTriggers/Draggable, Lenis), how AR/EN and
  pages share code, how to run/deploy, and where to drop owner-supplied assets/content.
- A one-page **self-audit** vs this brief: per-viewport screenshots, contrast numbers, FPS, and an
  honest "not done / needs owner" list.

## RULES OF ENGAGEMENT
- Follow the mock for structure & art direction; match juanmora for craft; keep Badr's brand & approved copy.
- Verify before you claim done — back every "it works" with a render, a measurement, or a test.
- Respect the pan-MENA constraint and the operator voice in any copy you touch.
- Bold, distinctive, intentional — **nothing generic**, and **never** at the cost of legibility or the CTA.
