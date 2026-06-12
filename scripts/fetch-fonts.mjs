/**
 * Self-host Google Fonts: downloads per-script subset woff2 files and
 * generates src/styles/fonts/*.css with local @font-face rules.
 * Run once at scaffold time; output is committed.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// family spec → output css bucket (shared | ar | en)
const FAMILIES = [
  { css: 'shared', q: 'family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1' },
  { css: 'shared', q: 'family=JetBrains+Mono:wght@400;500' },
  { css: 'ar', q: 'family=Reem+Kufi:wght@400..700' },
  { css: 'ar', q: 'family=IBM+Plex+Sans+Arabic:wght@400;500;600' },
  { css: 'ar', q: 'family=Amiri:wght@400' },
  { css: 'ar', q: 'family=Alexandria:wght@300..900' },
  { css: 'en', q: 'family=Bricolage+Grotesque:opsz,wght@12..96,300..800' },
  { css: 'en', q: 'family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400' },
];

const ROOT = new URL('..', import.meta.url).pathname;
const FONT_DIR = path.join(ROOT, 'public/fonts');
const CSS_DIR = path.join(ROOT, 'src/styles/fonts');
await mkdir(FONT_DIR, { recursive: true });
await mkdir(CSS_DIR, { recursive: true });

const buckets = { shared: [], ar: [], en: [] };
const seen = new Set();

for (const fam of FAMILIES) {
  const url = `https://fonts.googleapis.com/css2?${fam.q}&display=swap`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`css2 fetch failed: ${url} → ${res.status}`);
  let css = await res.text();

  // Download each woff2 and rewrite the URL to a local path.
  const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
  for (const u of urls) {
    const name = u.split('/s/')[1].replaceAll('/', '_');
    const local = `/fonts/${name}`;
    if (!seen.has(u)) {
      seen.add(u);
      const bin = await fetch(u, { headers: { 'User-Agent': UA } });
      if (!bin.ok) throw new Error(`woff2 fetch failed: ${u}`);
      await writeFile(path.join(FONT_DIR, name), Buffer.from(await bin.arrayBuffer()));
      console.log('saved', name);
    }
    css = css.replaceAll(u, local);
  }
  buckets[fam.css].push(`/* ${decodeURIComponent(fam.q)} */\n${css}`);
}

for (const [bucket, parts] of Object.entries(buckets)) {
  const file = path.join(CSS_DIR, `${bucket}.css`);
  await writeFile(file, parts.join('\n\n'));
  console.log('wrote', file);
}
console.log('done.');
