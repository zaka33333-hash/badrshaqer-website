import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const ROOT = '/Users/zaka/Desktop/badrshaqer-website/dist';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
const server = createServer(async (req, res) => {
  try { let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; if (!path.extname(p)) p += '/index.html';
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(await readFile(path.join(ROOT, p)));
  } catch { res.writeHead(404); res.end('nf'); }
});
await new Promise(r => server.listen(4184, r));
const browser = await chromium.launch();
for (const pp of ['/', '/en/']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const sizes = { total: 0, js: 0, css: 0, font: 0, img: 0, html: 0 };
  page.on('response', async (r) => {
    try {
      const b = await r.body();
      const u = r.url();
      sizes.total += b.length;
      if (u.endsWith('.js')) sizes.js += b.length;
      else if (u.endsWith('.css')) sizes.css += b.length;
      else if (u.endsWith('.woff2')) sizes.font += b.length;
      else if (/\.(webp|png|jpg|svg)/.test(u)) sizes.img += b.length;
      else if (u.endsWith('/') || u.endsWith('.html')) sizes.html += b.length;
    } catch {}
  });
  await page.goto(`http://localhost:4184${pp}`, { waitUntil: 'load' });
  const metrics = await page.evaluate(() => new Promise((resolve) => {
    let lcp = 0, cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    setTimeout(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      resolve({ lcp: Math.round(lcp), cls: +cls.toFixed(4), domContentLoaded: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd) });
    }, 3500);
  }));
  // FPS during a heavy programmatic scroll
  const fps = await page.evaluate(() => new Promise((resolve) => {
    let frames = 0;
    const t0 = performance.now();
    const count = () => { frames++; if (performance.now() - t0 < 3000) requestAnimationFrame(count); else resolve(Math.round(frames / 3)); };
    requestAnimationFrame(count);
    const total = document.documentElement.scrollHeight - innerHeight;
    let p = 0;
    const scroller = setInterval(() => { p += 0.02; window.scrollTo(0, total * Math.min(1, p)); if (p >= 1) clearInterval(scroller); }, 60);
  }));
  console.log(pp, JSON.stringify({ ...metrics, fpsDuringScroll: fps, kb: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [k, Math.round(v / 1024)])) }));
  await page.close();
}
await browser.close(); server.close();
