// JPEG/PNG → WebP via Chromium canvas. usage: node towebp.mjs <in> <out> [maxDim] [quality]
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const [inp, outp, maxDim = '0', q = '0.82'] = process.argv.slice(2);
const b64 = readFileSync(inp).toString('base64');
const mime = inp.endsWith('.png') ? 'image/png' : 'image/jpeg';
const browser = await chromium.launch();
const page = await browser.newPage();
const out = await page.evaluate(async ({ b64, mime, maxDim, q }) => {
  const img = new Image();
  img.src = `data:${mime};base64,${b64}`;
  await img.decode();
  let { width: w, height: h } = img;
  const m = parseInt(maxDim, 10);
  if (m && Math.max(w, h) > m) { const s = m / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  c.getContext('2d').drawImage(img, 0, 0, w, h);
  return c.toDataURL('image/webp', parseFloat(q)).split(',')[1];
}, { b64, mime, maxDim, q });
writeFileSync(outp, Buffer.from(out, 'base64'));
console.log(outp, Math.round(Buffer.from(out, 'base64').length / 1024) + 'KB');
await browser.close();
