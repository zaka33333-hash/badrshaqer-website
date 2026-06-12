# Photo generation prompts — badrshaqer.com

Use the frontal portrait of Badr as the identity reference in every generation
(Midjourney `--cref` / Flux Kontext / GPT-Image edit with "keep this exact face").
Keep the black crewneck sweater in every shot — one wardrobe everywhere reads as
art direction, not coincidence (it's half of juanmora's trick).

**Append this style block to every prompt:**

> shot on 35mm full-frame, f/2 shallow depth of field, warm tungsten grade —
> amber highlights, deep brown-black shadows (#0d0b07), hints of deep red
> (#c8281e) and brass (#ad7d3a) in the practical lights, subtle film grain,
> authentic skin texture with visible pores, no beauty retouching, moody
> editorial photography for a personal-brand website, photorealistic

**Negative prompt (all):**

> plastic skin, over-smoothed, HDR look, oversaturated, teal-and-orange,
> corporate stock photo, suit and tie, visible brand logos, text, watermark,
> deformed hands, extra fingers, blue daylight office

---

## 1 · HERO — the money shot → `public/assets/hero-photo.webp`
**AR 16:9 (generate 3:2, crop). Face = reference. Composition is non-negotiable:**

> Cinematic photo of a young entrepreneur (exact face from reference, light
> stubble, short dark hair, black crewneck sweater) working late at a desk,
> seen from chest up at a slight 3/4 angle, eyes focused on a laptop screen
> just out of frame, lit only by one warm desk lamp and the faint glow of the
> screen. The room behind him falls into near-black shadow with one soft
> warm-red light bleeding from the upper right corner. Subject positioned in
> the upper two-thirds of the frame, slightly right of center; the bottom
> third of the image is dark, clean and empty (huge typography will sit
> there), the left edge has quiet negative space. Atmosphere: focused
> operator at work, midnight, serious, warm.

Variant worth trying: same but **over-ear headphones on** (closest to the mock).

## 2 · WHY-ME full-bleed → replaces `book-interior.webp` in `.whyme` (home.css)
**AR 16:9. Subject right HALF, left half = copy space:**

> Cinematic side-profile portrait of the same man (reference face, black
> crewneck), standing in a dark room looking off-frame to the right, lit by a
> single warm rim light that traces his profile, brass-gold edge light on the
> jaw and shoulder, the entire left 55% of the frame in deep soft brown-black
> shadow with faint warm haze (text will be placed there). Contemplative,
> sharp, confident. No props.

## 3 · STATEMENT BRIDGE / story page band
**AR 21:9. Silhouette energy, no readable face needed:**

> Wide cinematic shot of the same man from behind and slightly to the side,
> sitting at a minimal desk in a dark room, warm lamp on the desk, a haze of
> warm light around his silhouette, deep red glow far in the background,
> composition mostly darkness — subject small, bottom-left third. Quiet,
> cinematic, like a film still about late-night work.

## 4 · FOOTER stylized 3D portrait → `Footer.astro` (mock frame 11)
**AR 16:9. Illustration, not photo:**

> Stylized 3D character illustration (Pixar/Blender render style) of the same
> man — recognizable likeness from the reference photo: short dark hair, light
> stubble, black crewneck — sitting behind a desk at night facing the camera,
> lit by a warm desk lamp and monitor glow, dark cozy room behind him with a
> few framed pictures on the wall, deep red accent light from one side. Warm,
> slightly playful, premium. Soft global illumination, subsurface skin
> scattering, high detail render.

## 5 · CLEAN PORTRAIT — OG cards, story page, about → `og-*.jpg` sources
**AR 4:5:**

> Studio editorial portrait of the same man (reference face, black crewneck)
> against a near-black warm brown backdrop (#0d0b07), looking straight into
> camera with calm confidence, one large soft key light from the left, a thin
> deep-red (#c8281e) rim light on the right edge of the face and shoulder,
> shallow depth of field, hands relaxed out of frame.

---

## Pipeline notes
- Generate at max resolution, upscale ×2 (hero needs ~2400px wide), export WebP q80.
- Reject any result where skin looks airbrushed — regenerate; texture sells realism.
- Drop-in points are documented in README ("Where to drop owner assets").

## The honest alternative
juanmora's photos are *real*. The entire set above can be shot in 30 minutes
with a phone: dark room, one warm lamp (or a phone flashlight through a paper
sheet), black sweater, laptop. Frames needed: (1) 3/4 at-the-laptop from chest
up, (2) standing side profile against darkness, (3) from-behind silhouette at
the desk. A real shoot will beat AI on skin, edges, and trust — use AI only to
bridge until then.
