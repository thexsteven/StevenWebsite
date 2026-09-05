import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const base = process.env.VERIFY_URL || 'http://localhost:4500';
const out = process.env.VERIFY_OUT || 'scrollcraft/builds/steven/lab/routes';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.addInitScript(() => {
  Element.prototype.requestPointerLock = () => Promise.reject(new Error('Disabled for verification'));
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
  Document.prototype.exitPointerLock = () => {};
});
const page = await context.newPage();
const errors = [];
const failures = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('response', (response) => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
const paths = ['/', '/reisen', '/reisen/hawaii', '/reisen/hawaii/flug-ankunft', '/reisen/hawaii/alltag', '/reisen/hawaii/adventures', '/reisen/hawaii/essen-kultur', '/reisen/hawaii/big-island', '/reisen/radtour-cannes', '/ueber-mich', '/karriere', '/karriere/semester-1', '/karriere/praxis-1', '/karriere/semester-2', '/impressum', '/datenschutz'];
const results = [];
const placements = {};
for (const width of [1440, 390, 360]) {
  await page.setViewportSize({ width, height: width === 360 ? 640 : width === 390 ? 844 : 900 });
  for (const path of paths) {
    const response = await page.goto(base + path);
    assert.equal(response.status(), 200, path);
    await page.waitForFunction(() => window.ScrollCraft?.instances.length === 1);
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      title: document.title,
      headings: document.querySelectorAll('h1').length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      media: [...document.querySelectorAll('img[src], video[src], source[src]')].map((el) => el.getAttribute('src')),
      body: document.body.innerText,
      links: [...document.querySelectorAll('a[href]')].map((el) => el.getAttribute('href')),
      placeholders: [...document.querySelectorAll('[data-placeholder]')].map((el) => el.dataset.placeholder),
      resources: performance.getEntriesByType('resource').map((entry) => ({ name: entry.name, bytes: entry.transferSize })),
    }));
    assert.equal(result.headings, 1, `${path}: h1`);
    assert.equal(result.overflow, false, `${path}: overflow at ${width}`);
    assert.equal(result.media.length, 0, `${path}: media before approval`);
    assert(!/[—]|Lorem ipsum|Auslandssemester(?! und keine)/.test(result.body), `${path}: disallowed copy`);
    if (path !== '/impressum') assert(!result.body.includes('Goethestraße'), `${path}: address outside legal page`);
    assert(!result.links.some((href) => /^\/(liebe|motivation)/.test(href)), `${path}: legacy link`);
    assert(!result.resources.some((entry) => /cloudinary|googleapis|google-analytics/.test(entry.name)), `${path}: external asset request`);
    await page.screenshot({ path: `${out}/${width}-${path.replaceAll('/', '_') || 'home'}.png`, fullPage: true });
    results.push({ path, width, title: result.title, bytes: result.resources.reduce((sum, entry) => sum + entry.bytes, 0) });
    for (const name of result.placeholders) placements[name] = [...new Set([...(placements[name] || []), path])];
  }
}
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(base);
await page.waitForFunction(() => window.ScrollCraft?.instances.length === 1);
const selection = page.getByRole('group', { name: 'Reiseauswahl' });
if (await selection.count()) {
  await selection.getByRole('button', { name: 'Radtour', exact: true }).click();
  assert.equal(await page.locator('.window-caption a').getAttribute('href'), '/reisen/radtour-cannes');
  assert.equal(await page.locator('.window-media [data-placeholder]').getAttribute('data-placeholder'), 'cycling');
  await selection.getByRole('button', { name: 'Anreise nach Venedig', exact: true }).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.window-media [data-placeholder]').getAttribute('data-placeholder'), 'night');
  assert.equal(await page.locator('.window-caption a').getAttribute('href'), '/reisen');
  await selection.getByRole('button', { name: 'Hawaii', exact: true }).click();
  await page.goto(base);
  await page.waitForFunction(() => window.ScrollCraft?.instances.length === 1);
}
await page.keyboard.press('Tab');
assert.equal(await page.locator(':focus').innerText(), 'Zum Inhalt springen');
await page.keyboard.press('Enter');
assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
for (let i = 0; i < 3; i++) {
  await page.getByRole('navigation', { name: 'Hauptnavigation' }).getByRole('link', { name: 'Reisen', exact: true }).click();
  await page.waitForURL(base + '/reisen');
  await page.waitForFunction(() => window.ScrollCraft?.instances.length === 1);
  await page.getByRole('link', { name: 'Steven Braun, Startseite' }).click();
  await page.waitForURL(base + '/');
  await page.waitForFunction(() => window.ScrollCraft?.instances.length === 1 && document.querySelector('.sc-act--pinned'));
}
const states = [];
for (const p of [0, .5, 1]) {
  await page.evaluate((p) => { const act = document.querySelector('[data-sc-fall]'); window.scrollTo({ top: act.offsetTop + (act.offsetHeight - innerHeight) * p, behavior: 'instant' }); }, p);
  await page.waitForTimeout(150);
  states.push(await page.locator('[data-sc-fall]').getAttribute('data-sc-verify-state'));
}
assert.equal(new Set(states).size, 3, 'Signature must change through scroll');
await page.getByRole('navigation', { name: 'Hauptnavigation' }).getByRole('link', { name: 'Kontakt', exact: true }).click();
await page.waitForTimeout(1000);
assert(await page.locator('#kontakt').evaluate((el) => el.getBoundingClientRect().top < innerHeight), 'Contact anchor');
assert.equal(await page.locator('#kontakt .text-link').getAttribute('href'), 'mailto:stevenbraun3107@icloud.com');
assert.equal((await context.cookies()).length, 0, 'No cookies');
for (const path of ['/liebe/prolog', '/motivation', '/reisen/hawaii/unbekannt', '/karriere/unbekannt']) {
  assert.equal((await context.request.get(base + path)).status(), 404, `${path} excluded`);
}
assert.deepEqual(errors, [], 'Browser errors');
assert.deepEqual(failures, [], 'HTTP failures');
fs.writeFileSync(`${out}/report.json`, JSON.stringify({ results, placements, states, errors, failures, keyboard: 'SkipLink passed', navigation: 'Three round trips, one engine instance', cookies: 0 }, null, 2));
await context.setOffline(false);
const cdp = await context.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
const performanceResults = [];
for (const path of ['/', '/reisen/radtour-cannes']) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  performanceResults.push(await page.evaluate(() => ({ path: location.pathname, loadMs: performance.getEntriesByType('navigation')[0].loadEventEnd, transferBytes: performance.getEntriesByType('navigation')[0].transferSize + performance.getEntriesByType('resource').reduce((sum, entry) => sum + entry.transferSize, 0) })));
}
fs.writeFileSync(`${out}/performance.json`, JSON.stringify(performanceResults, null, 2));
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
await cdp.send('Emulation.setScriptExecutionDisabled', { value: true });
await page.goto(base);
assert.equal(await page.locator('.career-copy').evaluate((el) => getComputedStyle(el).opacity), '1', 'No-JS copy visible');
await page.screenshot({ path: `${out}/no-js.png`, fullPage: true });
console.log('No-JS content and throttled load verified:', performanceResults);
console.log(`Verified ${results.length} route/viewport combinations, keyboard, navigation, signature, cookies and excluded routes.`);
await browser.close();
