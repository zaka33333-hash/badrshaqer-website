// Extract the 4 channel logos — fixed grid geometry (centers measured on the page).
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const b64 = readFileSync('/tmp/canva-3200.png').toString('base64');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 400 } });
const out = await page.evaluate(async (b64) => {
  const img = new Image();
  img.src = 'data:image/png;base64,' + b64;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const CY = 1349, SIDE = 520; // circle band; side slightly inside the 272px radius
  const CENTERS = [592, 1264, 1936, 2608];
  return CENTERS.map((cx) => {
    const oc = document.createElement('canvas');
    oc.width = 360; oc.height = 360;
    const octx = oc.getContext('2d');
    // clip to a circle so shadows/neighbor glow can't leak into corners
    octx.beginPath();
    octx.arc(180, 180, 180, 0, Math.PI * 2);
    octx.clip();
    octx.drawImage(c, cx - SIDE / 2, CY - SIDE / 2, SIDE, SIDE, 0, 0, 360, 360);
    return oc.toDataURL('image/png').split(',')[1];
  });
}, b64);
const names = ['main', 'flousak', 'media', 'mindset'];
out.forEach((b, i) => writeFileSync(`public/assets/channels/${names[i]}.png`, Buffer.from(b, 'base64')));
console.log('ok');
await browser.close();
