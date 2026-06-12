/**
 * Screenshot harness: serves dist/, scrolls each page section by section,
 * captures console errors + failed requests. Usage:
 *   node scripts/shoot.mjs [path=/] [width=1440] [height=900] [label]
 * Writes to /tmp/bshots/<label>-<n>.png
 */
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = new URL('../dist', import.meta.url).pathname;
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    if (!path.extname(p)) p += '/index.html';
    const data = await readFile(path.join(ROOT, p));
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('nf');
  }
});
await new Promise((r) => server.listen(process.env.PORT || 4188, r));

const [pagePath = '/', w = '1440', h = '900', label = 'shot', reduced = ''] = process.argv.slice(2);
await mkdir('/tmp/bshots', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: +w, height: +h },
  deviceScaleFactor: 1,
  reducedMotion: reduced ? 'reduce' : 'no-preference',
});
const page = await ctx.newPage();
const consoleErrors = [];
const failedReqs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consoleErrors.push(`${m.type()}: ${m.text()}`); });
page.on('requestfailed', (r) => failedReqs.push(`${r.url()} → ${r.failure()?.errorText}`));
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));

await page.goto(`http://localhost:${process.env.PORT || 4188}${pagePath}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2600); // loader + intro

const total = await page.evaluate(() => document.documentElement.scrollHeight);
const steps = Math.min(14, Math.ceil(total / +h));
for (let i = 0; i < steps; i++) {
  const y = Math.round((total - +h) * (i / Math.max(1, steps - 1)));
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/bshots/${label}-${String(i).padStart(2, '0')}.png` });
}
console.log(JSON.stringify({ total, steps, consoleErrors, failedReqs }, null, 2));
await browser.close();
server.close();
