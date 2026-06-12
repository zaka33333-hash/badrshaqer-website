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
await new Promise(r => server.listen(4192, r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const pp of ['/story/', '/book/']) {
  await page.goto('http://localhost:4192' + pp, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const el = document.querySelector('.pagehero__head');
    const word = el.querySelector('.word');
    const cs = getComputedStyle(word);
    // which font actually renders the first word
    const check = (txt, fam) => {
      const c = document.createElement('canvas').getContext('2d');
      c.font = `600 60px ${fam}`;
      return c.measureText(txt).width;
    };
    const txt = word.textContent;
    return {
      txt,
      family: cs.fontFamily,
      weight: cs.fontWeight,
      style: cs.fontStyle,
      loadedFonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`).slice(0, 30),
      reemAvailable: document.fonts.check('600 60px "Reem Kufi"', txt),
    };
  });
  console.log(pp, JSON.stringify(info, null, 1));
}
await browser.close(); server.close();
