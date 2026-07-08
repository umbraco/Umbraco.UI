#!/usr/bin/env node
/*
 * Driver for the Umbraco.UI (UUI) component library — drives its Storybook.
 *
 * Storybook is the interactive surface for this Lit web-component library.
 * This script drives it with Playwright (a project dependency — no extra
 * install). It assumes Storybook is ALREADY running on http://localhost:6006
 * (start it in the background first: `npm run storybook`). The driver waits
 * for the server, opens a story, optionally clicks an addon panel tab, and
 * writes a screenshot.
 *
 * Usage (run from the repo root):
 *   node .claude/skills/run-umbraco-ui/driver.mjs [options]
 *
 * Options:
 *   --story=<id>     Storybook story id        (default: uui-button--default)
 *   --panel=<tab>    Addon panel tab to open   (e.g. Readme, Controls; default: none)
 *   --iframe         Screenshot the isolated component canvas (iframe.html)
 *                    instead of the full Storybook manager UI
 *   --out=<path>     Screenshot output path    (default: storybook-shot.png)
 *   --url=<base>     Storybook base URL        (default: http://localhost:6006)
 *   --timeout=<ms>   Server-wait timeout       (default: 120000)
 *
 * Exits non-zero if the page logged console/page errors.
 */
import { chromium } from 'playwright';

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);

const base = args.url || 'http://localhost:6006';
const story = args.story || 'uui-button--default';
const panel = args.panel || null;
const iframe = !!args.iframe;
const out = args.out || 'storybook-shot.png';
const timeout = Number(args.timeout || 120000);

async function waitForServer(url, ms) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error(
    `Storybook not reachable at ${url} after ${ms}ms — is "npm run storybook" running?`,
  );
}

console.log(`[driver] waiting for storybook at ${base} ...`);
await waitForServer(base, timeout);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
const errors = [];
page.on('console', m => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', e => errors.push(String(e)));

const url = iframe
  ? `${base}/iframe.html?id=${story}&viewMode=story`
  : `${base}/?path=/story/${story}`;
console.log(`[driver] opening ${url}`);
await page.goto(url, { waitUntil: 'domcontentloaded' });
// Storybook loads the manager + preview iframe asynchronously.
await page.waitForTimeout(iframe ? 1500 : 4000);

if (panel && !iframe) {
  console.log(`[driver] opening addon panel "${panel}"`);
  try {
    await page.getByRole('tab', { name: panel }).click({ timeout: 15000 });
    await page.waitForTimeout(1500);
  } catch (e) {
    console.log(
      `[driver] WARN: could not open panel "${panel}": ${e.message.split('\n')[0]}`,
    );
  }
}

await page.screenshot({ path: out });
console.log(`[driver] screenshot saved: ${out}`);
console.log(`[driver] console/page errors: ${errors.length}`);
for (const e of errors.slice(0, 10)) console.log('  - ' + e);

await browser.close();
process.exit(errors.length ? 1 : 0);
