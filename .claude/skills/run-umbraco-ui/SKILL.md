---
name: run-umbraco-ui
description: Build, run, and drive the Umbraco.UI (UUI) web-component library via its Storybook. Use when asked to run/start/launch Storybook, screenshot a UUI component, drive the component library in a browser, or build/preview the components.
---

# Run Umbraco.UI (UUI)

UUI is a Lit **web-component library** (`@umbraco-ui/uui`). Its interactive surface is **Storybook** (a web app on `http://localhost:6006`). You drive it with a Playwright script — `.claude/skills/run-umbraco-ui/driver.mjs` — that opens a story and screenshots it. Playwright is already a project dependency, so no extra runtime is needed.

All paths below are relative to the repo root. Verified on macOS (Node 24, npm 11); commands are OS-agnostic.

## Prerequisites

```bash
npm install
npx playwright install chromium   # browser binary; npm install does NOT fetch it
```

On a headless Linux container also run `npx playwright install-deps chromium` for the system libs (not needed on macOS).

## Build (optional — only to produce the dist library)

Storybook does **not** need a prior build. Build only when verifying the published artifact:

```bash
npm run build      # web-component analyze → Vite lib build → tsc d.ts ; outputs dist/index.js, dist/index.d.ts
```

## Run (agent path) — drive Storybook + screenshot

**1. Start Storybook in the background** (long-running; leave it up). Use your harness's own background mechanism — do **not** append `&` inside a backgrounded wrapper (it detaches and gets killed):

```bash
npm run storybook   # runs `analyze` then `storybook dev -p 6006`
```

Wait until it's reachable (cold start ~1–2 min for the analyze step; warm ~5 s):

```bash
until [ "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:6006)" = 200 ]; do sleep 5; done
```

**2. Drive it with the Playwright driver.** It waits for the server, opens a story, optionally opens an addon panel, screenshots, and reports console errors (exit ≠ 0 if any):

```bash
# Isolated component canvas (best for component screenshots):
node .claude/skills/run-umbraco-ui/driver.mjs --story=uui-button--looks-and-colors --iframe --out=shot.png

# Full Storybook manager with an addon panel open (e.g. the README panel):
node .claude/skills/run-umbraco-ui/driver.mjs --story=uui-button--default --panel=Readme --out=shot.png
```

Options: `--story=<id>` (default `uui-button--default`), `--iframe` (component canvas only), `--panel=<tab>` (e.g. `Readme`, `Controls`; manager mode only), `--out=<path>`, `--url=<base>`, `--timeout=<ms>`. Then **look at `shot.png`** — a healthy run prints `console/page errors: 0`.

Story ids are `<kebab-component>--<kebab-story>`, e.g. `uui-button--default`, `uui-button--looks-and-colors`. Browse the sidebar in manager mode to discover them; docs pages use `--docs`.

## Run (human path)

`npm run storybook` then open `http://localhost:6006` in a browser. Useless headless — use the driver above instead.

## Gotchas

- **`npm run storybook` is `analyze` + `storybook dev`.** The analyze step (Web Component Analyzer over 96 files) prints alarming `!!!!!!! WARNING !!!!!!!` banners about `custom-elements.json` being "experimental" — these are **normal**, not failures.
- **Cold vs warm start.** First launch waits on the analyze step (~1–2 min). A rebuild within the same checkout is cached and ready in ~5 s.
- **The driver does not start Storybook** — it only polls for it. Start Storybook first, or the driver fails fast with "Storybook not reachable… is `npm run storybook` running?".
- **Two screenshot modes matter.** `--iframe` hits `/iframe.html?id=…` and captures just the rendered component (clean shots). Without it you get the full manager UI (sidebar + canvas + addon panels) — needed when you want `--panel`.
- **Components are in shadow DOM.** Playwright's `getByRole`/`getByText` pierce shadow roots (the driver's `--panel` click relies on this); raw CSS selectors won't cross shadow boundaries.
- **Background-process trap:** launching `npm run storybook` with a trailing `&` inside an already-backgrounded shell detaches it and it gets reaped when the wrapper returns. Launch it directly via the background mechanism instead.

## Troubleshooting

- `Storybook not reachable at http://localhost:6006 after 120000ms` → Storybook isn't up. Start `npm run storybook`, wait for the `Storybook ready!` banner / a `200` on `:6006`.
- `browserType.launch: Executable doesn't exist` → run `npx playwright install chromium`.
- Driver exits `1` → it found console/page errors and printed the first 10. Inspect them; a clean component renders with `0`.

## Tests

The project's test suite is `npm run test` (Vitest browser tests in Chromium). Not exercised by this skill; some WebKit/email-validation tests are known-flaky.
