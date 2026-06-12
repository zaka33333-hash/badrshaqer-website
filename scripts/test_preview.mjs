import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 }
});

const consoleMsgs = [];
const failedReqs = [];

page.on('console', msg => consoleMsgs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', err => consoleMsgs.push(`[error] ${err.message}`));
page.on('requestfailed', req => failedReqs.push(`${req.url()} -> ${req.failure()?.errorText}`));

console.log('Navigating to http://localhost:4500/badrshaqer-website/en/ ...');
const res = await page.goto('http://localhost:4500/badrshaqer-website/en/', { waitUntil: 'networkidle' });

console.log(`Status code: ${res?.status()}`);
console.log(`Final URL: ${page.url()}`);

await page.waitForTimeout(3000); // let animations run/fail

console.log('\n--- CONSOLE MESSAGES ---');
consoleMsgs.forEach(m => console.log(m));

console.log('\n--- FAILED REQUESTS ---');
failedReqs.forEach(r => console.log(r));

await browser.close();
