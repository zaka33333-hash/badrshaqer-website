# Self-audit vs. the build brief — badrshaqer.com rebuild v2

Branch `rebuild-v2` · audited 2026-06-12 · methodology: built `dist/`, served locally,
Playwright captures of **every page × both languages × 375/768/1440** (+ home at 414/1024/1920),
17 parallel audit agents reading every frame, plus scripted contrast / keyboard /
reduced-motion / weight / web-vitals measurement. Curated evidence in `audit/shots/`.

## Deliverables vs. brief

| Requirement | Status |
|---|---|
| 7 page types × AR/EN (14 pages + 404) | ✅ built, all routes verified |
| Mock structure (12 frames) | ✅ hero w/ giant split name + draggable circles, light statement, dark promise, bilingual services hub + 3 cards (green dot), proof + numbered rail, testimonials, consulting 4-step + dark booking card, floating book, why-me full-bleed, Almobadir, outro w/ giant name |
| juanmora craft stack | ✅ Lenis (lerp .085) + GSAP ScrollTrigger (hero exit scrub, **pinned** statement, ghost-numeral parallax) + Draggable/Inertia (hero shapes, testimonial strip) + SplitText-equivalent server-side word/char masks + custom cursor w/ action labels + magnetic CTAs + click-to-copy email + WebGL atmosphere + page loader w/ real progress |
| Approved copy verbatim | ✅ hero promise, consulting 4-step + card, proof stats, book copy, testimonials, Almobadir, outro — byte-identical from the live site (marked APPROVED in `src/data/copy/`) |
| Arabic quality | ✅ MSA-light, Western digits, no tashkeel (one legacy «بُني» fixed to «مبني»), mono labels untracked for cursive joins; name/heading splits at non-joining boundaries only |
| pan-MENA neutrality | ✅ no Saudi framing; testimonials Riyadh/Dubai/Cairo (approved set) |
| Real links | ✅ Calendly / zaap.bio / almobadir.com / @badrshaqer socials / badr@almobadir.com; all `target=_blank` carry `rel="noopener noreferrer"` |

## Measured numbers

**Contrast (worst-frame, measured over rendered pixels at 1440×900):**
hero roles 3.7–13.6:1 · hero name 9.3:1 · scroll cue 5.4:1 · why-me intro/head/bullets
7.0–15.8:1 (after directional scrim fix) · outro head/sub 13.9/15.4:1 · outro meta 9.4–10.5:1.
All ≥ AA for their size. (Method: hide text → sample worst background pixel in its box.)

**Performance (localhost, 1440×900):** LCP 156ms (AR) / 84ms (EN) · **CLS 0.0006 / 0.0257** ·
56fps / 49fps during continuous programmatic scroll · weight **1.12MB AR / 1.01MB EN**
(fonts 657/549KB self-hosted subsets, JS 183KB raw ≈ 70KB gzip, images 184KB, zero CDN).
Lab numbers — real-device LCP will be higher; budget headroom is large.

**Console/network:** 0 page errors, 0 failed requests on all 14 pages × 3 viewports.
(Headless-only WebGL "ReadPixels" perf warnings come from the screenshot capture itself.)

**Reduced motion:** loader removed, Lenis/GSAP/cursor/WebGL/parallax/count-ups disabled;
probe found **0 hidden split words / 0 hidden reveals** across both fully-scrolled pages; stats
render final values.

**Keyboard:** skip-link first stop → `#main[tabindex=-1]`; all 25 stops show a visible 2px ring;
menu opens on Enter, focus trap cycles toggle→links→toggle (background `inert`), Escape closes
and returns focus. Reveal targets force visible on `:focus-visible`.

**SEO:** canonical + reciprocal hreflang (ar/en/x-default) on all 14 pages; sitemap.xml with
xhtml:link alternates; robots.txt; per-language manifests; JSON-LD Person/WebSite sitewide +
Book/Course/Service/ProfilePage/CollectionPage per page; full OG/Twitter.

## Issues found by the audit fleet and fixed

1. **(critical, sitewide)** `data-theme` attr didn't map theme tokens → secondary CTAs and
   promise-headline connector words rendered ink-on-ink in every dark band. Root-cause CSS fix.
2. Proof/consulting/book/publication headings overlapped their decks (split-mask negative margin).
3. Menu focus trap let Tab escape behind the overlay.
4. Arabic mono labels tracked at 0.2em severed cursive joins → 0.02em + 12px for `:lang(ar)`.
5. Mobile: hero role label under a draggable circle; book-page CTA below fold; outro giant name
   truncated at 375px (now stacks centered); footer meta <12px and X-link tap target <44px.
6. Pill nav washed out over light/carmine sections (opacity raised both themes).

## Honest "not done / needs owner"

| Item | State |
|---|---|
| **Real cinematic photo of Badr** | Missing — hero/why-me use brand-texture photos (`outro-backdrop`, `book-interior`). Drop-in slot documented in README. This is the single biggest gap to the mock. |
| **Articles archive** | No source provided. Index ships 6 unlinked "coming soon" topic cards (placeholder titles flagged OWNER-TODO) + honest "archive in transit" note routing to Almobadir. No article bodies were invented; the article template is the card/prose system ready for real content. |
| **Program 1/2 curriculum + pricing** | Not provided. Pages frame the promise + 3 pillar questions, with "details on request" → email CTA. Course JSON-LD has no invented price. |
| **Story facts** | Written ONLY from approved facts (degrees, 10 yrs, 200+ sessions, book, Almobadir). No employers/dates/cities invented — owner should fact-check tone and add specifics. |
| **Per-page OG cards** | All pages use the existing site-wide og-ar/og-en JPGs; per-page 1200×630 cards are an owner-asset task. |
| **3D/illustrated footer portrait + animated book illustration** | Footer uses the illustrated avatar; book is a CSS-3D object with the cherry cover texture. Lottie/Spline upgrades await owner assets. |
| **Needs manual check on real devices** | Safari `backdrop-filter` on pills/menu, `mix-blend-mode: difference` cursor, WebGL hero on low-power devices (it is reduced-motion-gated but not battery-gated), real-device FPS/LCP. |
| **Statement section pin** | Uses ScrollTrigger pin — verified in Chromium; check iOS Safari rubber-banding manually. |
| **Bilingual ghost headline** | The EN line on the AR services hub (and inverse) is **intentional** per mock frame 4 — flagged by one auditor as "untranslated copy"; keeping per art direction. |

## Verdict vs. craft bar

Side-by-side with juanmora.co: matching interaction density (cursor labels, magnetic, draggable
physics shapes, pin, letter/word reveals, loader, hide-on-scroll pill nav), a stronger
typographic system (Reem Kufi/Fraunces editorial spine + Alexandria/Bricolage statement
counterpoint vs. one geometric sans), and the same full-bleed giant-name composition. The gap
that remains is photographic: juanmora's hero is a real cinematic photo of its subject; ours
stands on brand textures until the owner supplies the shot.
