/**
 * Keyboard accessibility audit: serves dist/ on 5303, tabs through the page,
 * tests the menu focus trap + Escape behavior, and checks the skip link.
 * Usage: node scripts/keyboard-audit.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = new URL('../dist', import.meta.url).pathname;
const PORT = 5303;
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
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const snapshot = () => page.evaluate(() => {
  const el = document.activeElement;
  if (!el) return { tag: 'NONE' };
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const panel = document.getElementById('menuPanel');
  return {
    tag: el.tagName,
    cls: (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '',
    id: el.id || '',
    href: el.getAttribute ? (el.getAttribute('href') || '') : '',
    text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50),
    outlineStyle: cs.outlineStyle,
    outlineWidth: cs.outlineWidth,
    outlineColor: cs.outlineColor,
    boxShadow: cs.boxShadow,
    visible: r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0',
    onScreen: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth,
    inMenuPanel: !!(panel && panel.contains(el)),
    isBody: el === document.body,
  };
});

const hasVisibleFocusRing = (s) =>
  (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== 'none');

// ---- Part 1: 25 tab presses from page load ----
const tabSeq = [];
for (let i = 1; i <= 25; i++) {
  await page.keyboard.press('Tab');
  await page.waitForTimeout(60);
  tabSeq.push({ step: i, ...(await snapshot()) });
}

// ---- Part 3 data (gathered before menu test mutates state): skip link ----
const skipInfo = tabSeq[0];
const skipTarget = await page.evaluate(() => {
  const sl = document.querySelector('.skip-link');
  const main = document.getElementById('main');
  return {
    exists: !!sl,
    href: sl ? sl.getAttribute('href') : null,
    mainExists: !!main,
    mainTag: main ? main.tagName : null,
  };
});

// ---- Part 2: menu focus trap ----
await page.evaluate(() => document.getElementById('menuToggle')?.focus());
await page.keyboard.press('Enter');
await page.waitForTimeout(600);

const menuState = await page.evaluate(() => {
  const t = document.getElementById('menuToggle');
  const p = document.getElementById('menuPanel');
  const cs = p ? getComputedStyle(p) : null;
  return {
    expanded: t ? t.getAttribute('aria-expanded') : null,
    panelVisible: cs ? (cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0) : false,
    panelHidden: p ? p.getAttribute('aria-hidden') : null,
  };
});

const menuSeq = [];
for (let i = 1; i <= 12; i++) {
  await page.keyboard.press('Tab');
  await page.waitForTimeout(60);
  menuSeq.push({ step: i, ...(await snapshot()) });
}

await page.keyboard.press('Escape');
await page.waitForTimeout(600);
const afterEscape = await page.evaluate(() => {
  const t = document.getElementById('menuToggle');
  const p = document.getElementById('menuPanel');
  const cs = p ? getComputedStyle(p) : null;
  return {
    expanded: t ? t.getAttribute('aria-expanded') : null,
    panelVisible: cs ? (cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0) : false,
    focusOnToggle: document.activeElement === t,
    activeTag: document.activeElement?.tagName,
    activeId: document.activeElement?.id || '',
  };
});

// ---- Report ----
const fmt = (s) =>
  `#${String(s.step).padStart(2)} <${s.tag.toLowerCase()}${s.id ? '#' + s.id : ''}> cls="${s.cls}" text="${s.text}" href="${s.href}" ring=${hasVisibleFocusRing(s) ? 'YES' : 'NO'} (outline:${s.outlineStyle} ${s.outlineWidth}, shadow:${s.boxShadow === 'none' ? 'none' : 'yes'}) visible=${s.visible} onScreen=${s.onScreen} inMenu=${s.inMenuPanel}${s.isBody ? ' **BODY**' : ''}`;

console.log('=== PART 1: 25 Tab presses from load ===');
tabSeq.forEach((s) => console.log(fmt(s)));
console.log('\n=== PART 3: skip link ===');
console.log(JSON.stringify({ firstTabStop: { tag: skipInfo.tag, cls: skipInfo.cls, href: skipInfo.href }, ...skipTarget }, null, 2));
console.log('\n=== PART 2: menu opened via Enter on #menuToggle ===');
console.log('menu state after Enter:', JSON.stringify(menuState));
menuSeq.forEach((s) => console.log(fmt(s)));
console.log('after Escape:', JSON.stringify(afterEscape));

await browser.close();
server.close();
process.exit(0);
