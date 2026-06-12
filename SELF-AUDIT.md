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

**Contrast (worst-frame, measured over rendered pixels at 1440×900, golden photo set):**
hero roles 7.0–15.3:1 (soft local backings) · hero name 5.5:1 · why-me intro/head 3.4–4.6:1
(large text, ≥3 required) · outro head/sub 14.2/15.8:1 · outro meta 9.4–10.4:1. All ≥ AA for
their size. (Method: make text transparent → sample worst background pixel in its box. The
scroll-cue and why-me-bullet rows read 1.8–2.0 in the harness because the box includes their own
brass ornament glyphs — decorative pseudo-elements, not text background; labels sit on ≥0.82 ink.)

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
| **Photography** | Now in place: AI-generated set (hero at-desk, why-me profile, story silhouette, 3D footer render) produced from the owner's reference portrait via PHOTO-PROMPTS.md. Likeness approved by owner in-session; a real shoot can swap in at the same paths anytime. Contrast re-measured over the real images — all pass (scroll cue moved + backed after the new photo exposed it). |
| **Articles archive** | No source provided. Index ships 6 unlinked "coming soon" topic cards (placeholder titles flagged OWNER-TODO) + honest "archive in transit" note routing to Almobadir. No article bodies were invented; the article template is the card/prose system ready for real content. |
| **Program 1/2 curriculum + pricing** | Not provided. Pages frame the promise + 3 pillar questions, with "details on request" → email CTA. Course JSON-LD has no invented price. |
| **Story facts** | Written ONLY from approved facts (degrees, 10 yrs, 200+ sessions, book, Almobadir). No employers/dates/cities invented — owner should fact-check tone and add specifics. |
| **Per-page OG cards** | All pages use the existing site-wide og-ar/og-en JPGs; per-page 1200×630 cards are an owner-asset task. |
| **Animated book illustration** | The book is a CSS-3D object with the cherry cover texture; a Lottie/Spline upgrade remains optional. Footer now uses the 3D portrait card. |
| **Needs manual check on real devices** | Safari `backdrop-filter` on pills/menu, `mix-blend-mode: difference` cursor, WebGL hero on low-power devices (it is reduced-motion-gated but not battery-gated), real-device FPS/LCP. |
| **Statement section pin** | Uses ScrollTrigger pin — verified in Chromium; check iOS Safari rubber-banding manually. |
| **Bilingual ghost headline** | The EN line on the AR services hub (and inverse) is **intentional** per mock frame 4 — flagged by one auditor as "untranslated copy"; keeping per art direction. |

## Verdict vs. craft bar

Side-by-side with juanmora.co: matching interaction density (cursor labels, magnetic, draggable
physics shapes, pin, letter/word reveals, loader, hide-on-scroll pill nav), a stronger
typographic system (Reem Kufi/Fraunces editorial spine + Alexandria/Bricolage statement
counterpoint vs. one geometric sans), and the same full-bleed giant-name composition. The photographic gap is closed: the hero, why-me, story, and footer
now carry cinematic imagery of Badr (AI-generated from his reference portrait, swappable
for a real shoot at the same file paths).

### Addendum — channel-logo draggables (post-v1 feedback)
The four hero circles are the real Almobadir channel logos (main, فلوسك, MEDIA,
mindset), extracted at high resolution from the owner's Canva reference page
(`scripts/extract-logos.mjs`) — all four are originals, circular-clipped PNGs at
`public/assets/channels/`.
