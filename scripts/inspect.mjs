import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const ROOT = '/Users/zaka/Desktop/badrshaqer-website/dist';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try { let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; if (!path.extname(p)) p += '/index.html';
    const data = await readFile(path.join(ROOT, p)); res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(data);
  } catch { res.writeHead(404); res.end('nf'); }
});
await new Promise(r => server.listen(4190, r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4190/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2800);
const info = await page.evaluate(() => {
  const name = document.querySelector('.hero__name');
  const ws = [...document.querySelectorAll('.hero__name .w')];
  const cs = getComputedStyle(name);
  return {
    namePadding: cs.paddingInline || cs.paddingLeft + ' / ' + cs.paddingRight,
    nameRect: name.getBoundingClientRect().toJSON(),
    words: ws.map(w => ({ text: w.textContent, rect: w.getBoundingClientRect().toJSON(), transform: getComputedStyle(w).transform })),
    scrollX: window.scrollX,
    docW: document.documentElement.scrollWidth,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close(); server.close();
