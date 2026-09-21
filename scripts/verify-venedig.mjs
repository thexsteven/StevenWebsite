import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright-core';

const base = process.env.VERIFY_URL || 'http://localhost:4500';
const out = 'scrollcraft/builds/steven/lab/venedig';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
const errors = [];
const failedResponses = [];
const context = await browser.newContext();
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
page.on('response', (response) => {
  if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
});

for (const { width, height } of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
]) {
  await page.setViewportSize({ width, height });
  const response = await page.goto(`${base}/reisen/venedig`, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);

  assert.equal(await page.locator('h1').count(), 1, `one h1 at ${width}px`);
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
    `no horizontal overflow at ${width}px`,
  );
  assert.equal(await page.locator('img').count(), 16, `all story images at ${width}px`);
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
    assert(await image.getAttribute('alt'), `image alt at ${width}px`);
    assert.match(await image.evaluate((element) => element.currentSrc), /f_auto,q_auto,w_\d+/, `optimized image at ${width}px`);
  }
  assert.equal(await page.locator('video source').getAttribute('src'), 'https://res.cloudinary.com/dozdjb4fi/video/upload/f_auto,q_auto/c5f4c9a2-f396-4f8f-aeaa-5e23d8b3d46e_smm1rn.mp4');
  await page.screenshot({ path: `${out}/${width}.png`, fullPage: true });
}

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${base}/reisen`);
assert.equal(await page.getByRole('link', { name: 'Venedig-Reise lesen', exact: true }).getAttribute('href'), '/reisen/venedig');

await page.goto(base);
assert.equal(await page.getByRole('link', { name: 'Die Venedig-Reise lesen', exact: true }).getAttribute('href'), '/reisen/venedig');
assert.equal(await page.locator('.venice-panel [data-media]').getAttribute('data-media'), 'venice');

assert.deepEqual(errors, [], 'no browser errors');
assert.deepEqual(failedResponses, [], 'no failed HTTP responses');
console.log('Verified /reisen/venedig at 1440px, 390px and 360px.');
await browser.close();
