# Badr Shaqer — site status

_Snapshot for picking up work from any device. Branch: **`rebuild-v2`**._

## Where it lives
- **Live (preview):** https://zaka33333-hash.github.io/badrshaqer-website/ — EN at `/en/`.
- **Repo:** `zaka33333-hash/badrshaqer-website`, active branch **`rebuild-v2`** (`main` holds the old single-page site, archived under `legacy/`).
- **Auto-deploy:** any push to `rebuild-v2` rebuilds + redeploys to the link above (GitHub Actions → Pages, ~1 min).
- **Stack:** Astro (multi-page) · bilingual AR (primary, RTL) + EN · GSAP + Lenis + View Transitions.

## How to continue from a phone
This was a local terminal session (can't transfer). To keep working with Claude:
open **claude.ai/code** or the Claude app → point it at this repo / `rebuild-v2`.
It's all pushed, so a fresh session reads the code + commit history to get oriented.

## Done
- Multi-page bilingual rebuild, 7 page types × AR/EN + 404.
- **Cohesion:** whole site lives between exactly two tones — `--surface` (#f5f0e6 warm light) + `--ink` (#0d0b07). One tone per role, no per-section drift.
- **Type:** English = **General Sans** (self-hosted, free Goga-alike) for everything — display + body, contrast by weight. Arabic = Reem Kufi / Alexandria / IBM Plex Arabic (General Sans is Latin-only).
- **CTAs:** premium pills (carmine gradient, soft glow, elastic arrow).
- **Hero:** photo backdrop, giant centred name, 4 draggable Almobadir channel circles nestled in the name seam (`--seam-mid: 46%`).
- **Section-nav rail** (left, theme-aware), **page-transition wipe**, **focus marquee**, **logo glint**.
- **Build program** (`/programs/become-a-consultant/`): pricing tracks **Core $2,497 / Boardroom $4,997** + Apply CTA.
- **Application form** `/apply` (+ `/en/apply`): 18 questions, branded, EN + AR.
- Nav: X social pill replaced with an **AR/EN language toggle**.

## Open items (need owner input)
1. **Application form is not connected.** `FORM_ENDPOINT` in `src/data/copy/apply.js` is a Formspree placeholder (`…/YOUR_FORM_ID`). Create a free Formspree form, paste the real id, push → submissions then land in your dashboard. Until then the form fills but submitting errors.
2. **Arabic apply-form copy** + the **statement eyebrow/supporting line** are my wording, not Badr's — needs his review.
3. **General Sans has no italic** — headline emphasis uses upright carmine instead (intentional).

## To launch on badrshaqer.com (later)
In `astro.config.mjs`: set `base: '/'` and `site: 'https://badrshaqer.com'`.
In `src/data/site.js`: set `SITE.domain` back to `https://badrshaqer.com`.
Everything else (routes, asset paths) auto-adjusts off `import.meta.env.BASE_URL`.
