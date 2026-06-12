/** Full-res clip of a page region. node scripts/crop.mjs <path> <w> <h> <x> <y> <cw> <ch> <label> [scrollY] */
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = new URL('../dist', import.meta.url).pathname;
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    if (!path.extname(p)) p += '/index.html';
    const data = await readFile(path.join(ROOT, p));
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('nf'); }
});
await new Promise((r) => server.listen(4189, r));

const [pagePath = '/', w = '1440', h = '900', x = '0', y = '0', cw = '720', ch = '450', label = 'crop', scrollY = '0'] = process.argv.slice(2);
await mkdir('/tmp/bshots', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto(`http://localhost:4189${pagePath}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2800);
if (+scrollY) { await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), +scrollY); await page.waitForTimeout(1200); }
await page.screenshot({ path: `/tmp/bshots/${label}.png`, clip: { x: +x, y: +y, width: +cw, height: +ch } });
console.log('ok');
await browser.close();
server.close();
