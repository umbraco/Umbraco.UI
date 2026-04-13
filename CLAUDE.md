# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this?

Umbraco.UI (UUI) is a web component library built with **Lit** and **TypeScript**. It provides 81+ reusable UI components (`<uui-button>`, `<uui-input>`, `<uui-table>`, etc.) published as a single npm package: `@umbraco-ui/uui`.

> **This repo has two active major versions on separate branches:**
>
> - **v1** (`v1/dev`) — multi-package monorepo under `packages/`, Lit 2.x, `@open-wc/testing`. Latest: 1.17.x. PRs target `v1/dev`.
> - **v2** (`main`) — single-package under `src/`, Lit 3.x, Vitest. Latest: 2.0.0-alpha. PRs target `main`.
>
> The docs below describe **v1**. `v1/contrib` no longer exists — do not use it.

## Common Commands

```bash
# Install dependencies
npm install

# Development — starts Storybook on port 6006
npm run storybook

# Build (Vite + TypeScript declarations + custom-elements.json)
npm run build

# Clean + build
npm run clean && npm run build

# Run all component tests with coverage (browser-based)
npm run test

# Watch mode for tests
npm run test:watch

# Test a single component (use folder name, e.g. "button")
npm run test:coverage-for button

# Lint
npm run lint

# Auto-fix lint + format
npm run format

# Scaffold a new component (interactive prompts)
npm run new-component
```

## Branching Model

- **`main`** (default) — v2 development branch (current: 2.x alpha), PR target for v2 work and community contributions.
- **`v1/dev`** — v1 maintenance branch (latest: v1.17.1)
- **`production`** — latest stable release, also the home for the Storybook at uui.umbraco.com (currently v1.17.1)

## Architecture (v2 — single package)

### What changed from v1

In v1, UUI was a monorepo of ~84 separate npm packages (`@umbraco-ui/uui-button`, `@umbraco-ui/uui-base`, etc.), each with its own `package.json`, Rollup config, and npm version. Build was orchestrated by Turbo + Lerna-Lite.

In v2, everything lives under a **single `@umbraco-ui/uui` package** with one Vite build. Components are individual ES modules for tree-shaking. See [MIGRATION-V1-TO-V2.md](docs/MIGRATION-V1-TO-V2.md) for the full migration guide.

|             | v1                                 | v2                                                      |
| ----------- | ---------------------------------- | ------------------------------------------------------- |
| Packages    | ~84 separate `@umbraco-ui/uui-*`   | Single `@umbraco-ui/uui`                                |
| Import      | `import '@umbraco-ui/uui-button';` | `import '@umbraco-ui/uui/components/button/button.js';` |
| Foundation  | `@umbraco-ui/uui-base/lib/...`     | `src/internal/...` (re-exported from root)              |
| CSS/Styles  | `@umbraco-ui/uui-css/lib/...`      | `src/styles/...` (re-exported from root)                |
| Build       | Rollup per package + Turbo         | Single Vite build                                       |
| Lit version | ^2.8.0                             | ^3.0.0                                                  |

### Project structure

```
src/
├── internal/        # Foundation: mixins, events, types, registration (was uui-base)
├── styles/          # CSS custom properties, text styles (was uui-css)
├── internal/test/   # Test utilities (UUITestMouse)
├── themes/          # Light, dark, and high-contrast theme CSS
├── components/      # 80 component directories
│   ├── button/
│   │   ├── button.ts              # Registration file (re-exports + defineElement call)
│   │   ├── button.element.ts      # Pure component class (no side effects)
│   │   ├── button.test.ts         # Tests
│   │   ├── button.story.ts        # Storybook story
│   │   └── README.md
│   └── ...
└── index.ts         # Root barrel — re-exports everything
stories/             # Compound/example Storybook stories (auth, scaffolding, home)
```

### Build system

- **Vite** builds the library with `preserveModules` (each source file → one output file)
- **TypeScript** (`tsc -p tsconfig.build.json`) generates declaration files
- **Lit** and **culori** are the only runtime dependencies and are externalized (not bundled)
- Output: `dist/` directory with ES modules, source maps, and `.d.ts` files
- Config: `vite.config.ts` — serves double duty as both build config and Vitest config

### Package exports

The `package.json` `exports` field exposes:

- `.` → `dist/index.js` (all components)
- `./components/*` → `dist/components/*` (cherry-pick)
- `./internal/*`, `./styles/*`, `./themes/*`

### Versioning & publishing

- Single version in root `package.json` and `lerna.json` (kept in sync)
- **Lerna-Lite** handles changelog generation and npm publishing
- **Conventional commits are required**: `type(scope): description`
  - Types: `feat`, `fix`, `build`, `docs`, `test`, `refactor`, `chore`
  - Scope: component name without `uui-` prefix (e.g. `fix(combobox): ...`)
  - `feat` triggers a minor bump, `fix` triggers a patch bump
- Publishing happens from CI on `v*` tags via `lerna publish from-package`
- Pre-release versions use `preid: "rc"` and publish to `prerelease` dist-tag
- Current: `2.0.0-alpha.1` on `main`; v1 latest: `1.17.1` on `v1/dev`

## Component Architecture

### Key patterns

**Mixin composition** — components compose behavior via mixins from `internal/`:

```typescript
export class UUIButtonElement extends UUIFormControlMixin(
  LabelMixin('', PopoverTargetMixin(LitElement))
) { ... }
```

**Element registration** — each component folder has a **registration file** (`{name}.ts`) that imports the pure class and registers it. Structure: imports → side effects → types → exports:

```typescript
// button/button.ts — registration file (has side effects)
import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonElement } from './button.element.js';

defineElement('uui-button', UUIButtonElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button': UUIButtonElement;
  }
}

export * from './button.element.js';
export { UUIButtonElement as default } from './button.element.js';
```

```typescript
// button/button.element.ts — pure class (no side effects, no registration)
export class UUIButtonElement extends ... { }
```

`defineElement` supports both direct call and decorator syntax. Direct calls are used in registration files; the decorator is only used for standalone example elements.

**Events** — custom events extend `UUIEvent` from `internal/` for type safety.

**CSS custom properties** — components expose styling via `--uui-*` variables.

**Shadow DOM** — all components use shadow DOM for encapsulation.

### Component rules

- Element name prefixed with `uui-`, class named `UUI{PascalCase}Element`
- Attribute reflection only for styling, not state
- No external dependencies without HQ approval
- No tag name assumptions — use `:host` or `this`
- JSDoc all properties, slots, events, and CSS custom properties
- Tests must pass, including basic accessibility tests
- Must have a Storybook story

## Testing

- **Vitest 4.x** + `vitest-browser-lit` + `@vitest/browser-playwright`, runs in Chromium locally and Chromium/Firefox/WebKit on CI
- Config: `vite.config.ts` (combined with build config — `test:` section)
- Setup file: `vitest.setup.ts` — registers the `toHaveNoViolations` custom matcher globally
- Tests live alongside components: `src/components/{name}/{name}.test.ts`
- Tests must import the registration file (e.g. `import './{name}.js';`) to register elements
- Render elements with `render` from `vitest-browser-lit`, not `fixture` from @open-wc
- Accessibility testing via `axeRun` from `../../internal/test/a11y.js`:
  ```typescript
  import { axeRun } from '../../internal/test/a11y.js';
  expect(await axeRun(element)).toHaveNoViolations();
  ```
- User interaction via `userEvent` from `vitest/browser`

## Linting & Formatting

- **ESLint** v9 flat config (`eslint.config.js`) with `typescript-eslint`, `eslint-plugin-lit`, `eslint-plugin-wc`, Prettier integration
- **Prettier**: single quotes, 2-space indent, `arrowParens: avoid`, `bracketSameLine: true`
- **Pre-commit hook** (Husky + lint-staged): runs ESLint, type-check on `*.element.ts`, Prettier

## Runtime Requirements (v1)

- Node >= 24.13, npm >= 11 (see `.nvmrc` and `engines` in package.json)
- Lit ^3.0.0
- Target: ES2022

## Development Philosophy

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
