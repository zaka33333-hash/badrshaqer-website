/**
 * Worst-frame contrast measurement for text over photos/gradients.
 * For each target: record text color, hide the element, screenshot its box,
 * find the background pixel closest to the text color in luminance
 * (worst case), and compute the WCAG contrast ratio against it.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { PNG } from './png-min.mjs';

const ROOT = new URL('../dist', import.meta.url).pathname;
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    if (!path.extname(p)) p += '/index.html';
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(await readFile(path.join(ROOT, p)));
  } catch { res.writeHead(404); res.end('nf'); }
});
const PORT = process.env.PORT || 4187;
await new Promise((r) => server.listen(PORT, r));

const lum = ([r, g, b]) => {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

const TARGETS = [
  { page: '/', sel: '.hero__role--a', scroll: 0 },
  { page: '/', sel: '.hero__role--b', scroll: 0 },
  { page: '/', sel: '.hero__scrollcue', scroll: 0 },
  { page: '/', sel: '.hero__name .w', scroll: 0 },
  { page: '/', sel: '.whyme__intro', scrollTo: '.whyme' },
  { page: '/', sel: '.whyme__head', scrollTo: '.whyme' },
  { page: '/', sel: '.whyme__bullet', scrollTo: '.whyme' },
  { page: '/', sel: '.outro__head', scrollTo: '.outro' },
  { page: '/', sel: '.outro__sub', scrollTo: '.outro' },
  { page: '/', sel: '.outro__meta', scrollTo: '.outro__meta' },
  { page: '/en/', sel: '.hero__role--a', scroll: 0 },
  { page: '/en/', sel: '.hero__role--b', scroll: 0 },
  { page: '/en/', sel: '.whyme__bullet', scrollTo: '.whyme' },
  { page: '/en/', sel: '.outro__meta', scrollTo: '.outro__meta' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let current = null;
const results = [];
for (const t of TARGETS) {
  if (current !== t.page) {
    await page.goto(`http://localhost:${PORT}${t.page}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    current = t.page;
  }
  const meta = await page.evaluate(({ sel, scrollTo }) => {
    if (scrollTo) document.querySelector(scrollTo)?.scrollIntoView({ behavior: 'instant', block: 'center' });
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const m = cs.color.match(/\d+(\.\d+)?/g).map(Number);
    return { color: m.slice(0, 3), fontSize: parseFloat(cs.fontSize), fontWeight: cs.fontWeight };
  }, t);
  if (!meta) { results.push({ ...t, error: 'not found' }); continue; }
  await page.waitForTimeout(1100);
  const box = await page.locator(t.sel).first().boundingBox();
  if (!box || box.width < 2) { results.push({ ...t, error: 'no box' }); continue; }
  await page.locator(t.sel).first().evaluate((el) => { el.style.color = 'transparent'; el.querySelectorAll('*').forEach(c => c.style.color = 'transparent'); });
  await page.waitForTimeout(120);
  const buf = await page.screenshot({
    clip: {
      x: Math.max(0, box.x), y: Math.max(0, box.y),
      width: Math.min(box.width, 1440 - box.x), height: Math.min(box.height, 900 - Math.max(0, box.y)),
    },
  });
  await page.locator(t.sel).first().evaluate((el) => { el.style.color = ''; el.querySelectorAll('*').forEach(c => c.style.color = ''); });
  const png = PNG.parse(buf);
  const textLum = lum(meta.color);
  let worst = Infinity, avg = 0, n = 0;
  for (let y = 0; y < png.height; y += 2) {
    for (let x = 0; x < png.width; x += 2) {
      const i = (y * png.width + x) * 4;
      const l = lum([png.data[i], png.data[i + 1], png.data[i + 2]]);
      const r = ratio(textLum, l);
      if (r < worst) worst = r;
      avg += r; n++;
    }
  }
  const large = meta.fontSize >= 24 || (meta.fontSize >= 18.66 && +meta.fontWeight >= 700);
  const threshold = large ? 3 : 4.5;
  results.push({
    page: t.page, sel: t.sel,
    textColor: meta.color.join(','), fontSize: meta.fontSize,
    worst: +worst.toFixed(2), avg: +(avg / n).toFixed(2),
    threshold, pass: worst >= threshold,
  });
}
console.log(JSON.stringify(results, null, 1));
await browser.close();
server.close();
