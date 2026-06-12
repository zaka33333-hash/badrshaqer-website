/**
 * Page weight + console cleanliness audit.
 * Serves dist/ on port 5302, loads '/' and '/en/', records every response
 * URL + byte size, totals per category, console errors, failed requests.
 * Usage: node scripts/weigh.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright';

const PORT = 5302;
const ROOT = new URL('../dist', import.meta.url).pathname;
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.ico': 'image/x-icon', '.avif': 'image/avif', '.gif': 'image/gif' };

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    if (!path.extname(p)) p += '/index.html';
    const data = await readFile(path.join(ROOT, p));
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream', 'content-length': data.length });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('nf');
  }
});
await new Promise((r) => server.listen(PORT, r));

function category(url, resourceType, contentType) {
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  if (ext === '.js' || ext === '.mjs' || resourceType === 'script') return 'js';
  if (ext === '.woff2' || ext === '.woff' || ext === '.ttf' || resourceType === 'font') return 'font';
  if (['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.avif', '.ico'].includes(ext) || resourceType === 'image') return 'image';
  if (ext === '.css' || resourceType === 'stylesheet') return 'css';
  if (ext === '.html' || resourceType === 'document') return 'html';
  return 'other';
}

async function audit(pagePath) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const responses = [];
  const consoleErrors = [];
  const failedReqs = [];

  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => failedReqs.push(`${r.url()} -> ${r.failure()?.errorText}`));
  page.on('response', async (resp) => {
    try {
      const url = resp.url();
      if (!url.startsWith('http')) return;
      let size = 0;
      let body = null;
      try { body = await resp.body(); size = body.length; } catch {
        const cl = resp.headers()['content-length'];
        size = cl ? parseInt(cl, 10) : 0;
      }
      let gzip = null;
      const cat = category(url, resp.request().resourceType(), resp.headers()['content-type'] || '');
      if (body && (cat === 'js' || cat === 'css' || cat === 'html')) {
        gzip = gzipSync(body).length;
      }
      responses.push({ url, status: resp.status(), size, gzip, cat });
    } catch { /* ignore */ }
  });

  await page.goto(`http://localhost:${PORT}${pagePath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2600); // loader + intro

  // Scroll through the page to trigger any lazy-loaded assets
  const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
  const steps = Math.min(14, Math.ceil(totalH / 900));
  for (let i = 0; i < steps; i++) {
    const y = Math.round((totalH - 900) * (i / Math.max(1, steps - 1)));
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1500);

  // Detect fonts loaded but never used to render anything
  const fontUsage = await page.evaluate(() => {
    const loaded = [];
    document.fonts.forEach((f) => loaded.push({ family: f.family.replace(/['"]/g, ''), weight: f.weight, style: f.style, status: f.status }));
    const used = new Set();
    document.querySelectorAll('*').forEach((el) => {
      if (!el.textContent || !el.textContent.trim()) return;
      const ff = getComputedStyle(el).fontFamily;
      ff.split(',').forEach((f) => used.add(f.trim().replace(/['"]/g, '').toLowerCase()));
    });
    return { loaded, used: [...used] };
  });

  await browser.close();

  const totals = { total: 0, js: 0, jsGzip: 0, font: 0, image: 0, css: 0, html: 0, other: 0 };
  for (const r of responses) {
    totals.total += r.size;
    totals[r.cat] += r.size;
    if (r.cat === 'js' && r.gzip != null) totals.jsGzip += r.gzip;
  }
  return { pagePath, responses, totals, consoleErrors, failedReqs, fontUsage };
}

const results = [];
for (const p of ['/', '/en/']) results.push(await audit(p));
server.close();

const fmt = (b) => `${(b / 1024).toFixed(1)} KB`;
for (const r of results) {
  console.log(`\n===== PAGE ${r.pagePath} =====`);
  console.log(`TOTAL: ${fmt(r.totals.total)} | HTML: ${fmt(r.totals.html)} | CSS: ${fmt(r.totals.css)} | JS: ${fmt(r.totals.js)} (gzip ~${fmt(r.totals.jsGzip)}) | FONTS: ${fmt(r.totals.font)} | IMAGES: ${fmt(r.totals.image)} | OTHER: ${fmt(r.totals.other)}`);
  console.log(`Requests: ${r.responses.length}`);
  console.log('\n-- responses (sorted by size desc) --');
  for (const resp of [...r.responses].sort((a, b) => b.size - a.size)) {
    console.log(`${String(resp.size).padStart(9)} B  [${resp.cat}] ${resp.status} ${resp.url.replace(`http://localhost:${PORT}`, '')}${resp.gzip != null ? ` (gzip ${resp.gzip})` : ''}`);
  }
  console.log(`\n-- console errors (${r.consoleErrors.length}) --`);
  r.consoleErrors.forEach((e) => console.log('  ' + e));
  console.log(`-- failed requests (${r.failedReqs.length}) --`);
  r.failedReqs.forEach((e) => console.log('  ' + e));
  console.log(`-- fonts loaded: ${r.fontUsage.loaded.filter((f) => f.status === 'loaded').length}, families used in DOM: ${r.fontUsage.used.join(', ')}`);
  const loadedFamilies = [...new Set(r.fontUsage.loaded.filter((f) => f.status === 'loaded').map((f) => f.family))];
  const unused = loadedFamilies.filter((f) => !r.fontUsage.used.includes(f.toLowerCase()));
  console.log(`-- loaded families: ${loadedFamilies.join(', ')}`);
  console.log(`-- loaded-but-unused families: ${unused.length ? unused.join(', ') : 'none'}`);
}
