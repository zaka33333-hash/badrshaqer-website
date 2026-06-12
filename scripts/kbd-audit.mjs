/**
 * Keyboard accessibility audit: serves dist/ on :5303, loads '/',
 * tabs through the page, tests menu focus trap + Escape, skip-link.
 * Usage: node scripts/kbd-audit.mjs
 * Output: JSON to stdout.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
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
await new Promise((r) => server.listen(5303, r));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`console: ${m.text()}`); });

await page.goto('http://localhost:5303/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const snapshot = () => page.evaluate(() => {
  const el = document.activeElement;
  if (!el) return { tag: 'NONE' };
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  // walk ancestors to find if inside menu panel
  const inMenuPanel = !!el.closest('#menuPanel');
  // visible focus: non-zero outline OR box-shadow change OR :focus-visible styles
  const outlineVisible = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
  const boxShadow = cs.boxShadow !== 'none' ? cs.boxShadow : '';
  return {
    tag: el.tagName,
    id: el.id || '',
    cls: (typeof el.className === 'string' ? el.className : (el.className?.baseVal || '')).slice(0, 80),
    text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60),
    href: el.getAttribute && (el.getAttribute('href') || ''),
    outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
    outlineVisible,
    boxShadow: boxShadow.slice(0, 100),
    visible: rect.width > 0 && rect.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none',
    onScreen: rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
    inMenuPanel,
    matchesFocusVisible: el.matches(':focus-visible'),
  };
});

const result = { tabSequence: [], menuTest: {}, skipLink: {}, consoleErrors };

// ---------- Part 1: Tab x25 through the page ----------
for (let i = 1; i <= 25; i++) {
  await page.keyboard.press('Tab');
  await page.waitForTimeout(80);
  const s = await snapshot();
  result.tabSequence.push({ step: i, ...s });
}

// ---------- Part 3 (checked from step 1 data): skip link first stop ----------
const first = result.tabSequence[0];
result.skipLink = {
  firstStopIsSkipLink: !!first && /skip/i.test(first.cls + ' ' + first.id),
  firstStop: first ? { tag: first.tag, cls: first.cls, href: first.href, text: first.text } : null,
  pointsToMain: first?.href === '#main',
  visibleWhenFocused: first ? first.visible && first.onScreen : false,
};
// verify #main exists
result.skipLink.mainTargetExists = await page.evaluate(() => !!document.getElementById('main'));

// ---------- Part 2: menu open, trap, escape ----------
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const toggleExists = await page.evaluate(() => !!document.getElementById('menuToggle'));
result.menuTest.toggleExists = toggleExists;

if (toggleExists) {
  await page.evaluate(() => document.getElementById('menuToggle').focus());
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700); // open animation

  result.menuTest.openedState = await page.evaluate(() => {
    const t = document.getElementById('menuToggle');
    const p = document.getElementById('menuPanel');
    const cs = p ? getComputedStyle(p) : null;
    return {
      ariaExpanded: t?.getAttribute('aria-expanded'),
      panelVisible: cs ? cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0 : false,
      panelAriaHidden: p?.getAttribute('aria-hidden'),
      focusAfterOpen: document.activeElement ? { tag: document.activeElement.tagName, id: document.activeElement.id, cls: String(document.activeElement.className).slice(0, 60), inPanel: !!document.activeElement.closest('#menuPanel') } : null,
    };
  });

  result.menuTest.trapSequence = [];
  for (let i = 1; i <= 12; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(80);
    const s = await snapshot();
    const isToggle = s.id === 'menuToggle';
    result.menuTest.trapSequence.push({ step: i, tag: s.tag, id: s.id, cls: s.cls, text: s.text, inMenuPanel: s.inMenuPanel, isToggle, outlineVisible: s.outlineVisible, boxShadow: s.boxShadow, focusVisible: s.matchesFocusVisible });
  }
  result.menuTest.escapedTrap = result.menuTest.trapSequence.some((s) => !s.inMenuPanel && !s.isToggle);
  result.menuTest.focusLostToBody = result.menuTest.trapSequence.some((s) => s.tag === 'BODY');

  // Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);
  result.menuTest.afterEscape = await page.evaluate(() => {
    const t = document.getElementById('menuToggle');
    const p = document.getElementById('menuPanel');
    const cs = p ? getComputedStyle(p) : null;
    return {
      ariaExpanded: t?.getAttribute('aria-expanded'),
      panelStillVisible: cs ? cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0 : false,
      focusReturnedToToggle: document.activeElement === t,
      activeElement: document.activeElement ? { tag: document.activeElement.tagName, id: document.activeElement.id } : null,
    };
  });
}

console.log(JSON.stringify(result, null, 2));
await browser.close();
server.close();
process.exit(0);
