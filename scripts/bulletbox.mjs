import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const ROOT = '/Users/zaka/Desktop/badrshaqer-website/dist';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try { let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; if (!path.extname(p)) p += '/index.html';
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(await readFile(path.join(ROOT, p)));
  } catch { res.writeHead(404); res.end('nf'); }
});
await new Promise(r => server.listen(4185, r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4185/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
await page.evaluate(() => document.querySelector('.whyme').scrollIntoView({ behavior: 'instant', block: 'center' }));
await page.waitForTimeout(1200);
const box = await page.locator('.whyme__bullet').first().boundingBox();
console.log('box', JSON.stringify(box));
await page.screenshot({ path: '/tmp/bshots/bulletbox.png', clip: box });
await page.screenshot({ path: '/tmp/bshots/whyme-now.png' });
await browser.close(); server.close();
