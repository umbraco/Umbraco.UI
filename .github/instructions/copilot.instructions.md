---
applyTo: '**/*'
---

# Umbraco UI (UUI) — Copilot Instructions

This repository is a **Lit + TypeScript web component library** (`@umbraco-ui/uui`). For full project context — architecture, branching model, build system, and versioning — see [`CLAUDE.md`](../../CLAUDE.md) at the repo root.

## Component conventions

- Element tag names are prefixed with `uui-`: e.g. `uui-button`, `uui-input`
- Class names follow `UUI{PascalCase}Element`: e.g. `UUIButtonElement`
- Each component lives in `src/components/{name}/` with these files:
  - `{name}.element.ts` — pure class, no side effects, no `defineElement` call
  - `{name}.ts` — registration file: imports the class, calls `defineElement`, exports everything
  - `{name}.test.ts` — tests (must import the registration file, not the element file)
  - `{name}.story.ts` — Storybook story
- Attribute reflection is for styling only, not state
- Use `:host` or `this` — never assume tag names
- JSDoc all public properties, slots, events, and CSS custom properties

## File structure rules

**Registration file** (`{name}.ts`) structure must be: imports → side effects → types → exports:

```typescript
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

**Element file** (`{name}.element.ts`) must not call `defineElement` or have side effects.

## Testing

- Tests render with `render` from `vitest-browser-lit` — not `fixture` from `@open-wc/testing`
- Tests import the **registration file** (e.g. `import './button.js'`), not the element file
- A11y check is required: `expect(await axeRun(element)).toHaveNoViolations()`
- User interaction uses `userEvent` from `vitest/browser`
- The `toHaveNoViolations` matcher is globally available via `vitest.setup.ts`

## Branching

- **`main`** (default) — v2 development, PR target for all contributions including community PRs
- **`v1/dev`** — v1 maintenance only (latest: v1.17.1); only bug fixes targeting v1 go here
- **`production`** — auto-updated on release; do not target with PRs

## PR review checklist

When reviewing a pull request, check:

1. **Commit messages** follow conventional commits: `type(scope): description`
   - Types: `feat`, `fix`, `build`, `docs`, `test`, `refactor`, `chore`
   - Scope: component name without `uui-` prefix (e.g. `fix(button): ...`)
   - `feat` = minor bump, `fix` = patch bump — use the right type

2. **No new external dependencies** without prior approval

3. **Registration/element file split** is maintained — no `defineElement` in `.element.ts` files

4. **Tests included** for any new behaviour or bugfix

5. **Accessibility** — `axeRun` assertion present for new/modified components

6. **No tag name hardcoding** — use `:host` selectors and `this`, not `'uui-*'` strings

7. **Surgical changes** — diff should only touch what the PR describes; flag unrelated changes

8. **Story included** for new components or significant behaviour changes

## What to flag

- Missing or incorrect JSDoc on public API (properties, slots, events, CSS custom properties)
- Side effects in `.element.ts` files
- Tests using `@open-wc/testing` fixtures (wrong testing framework)
- Attributes used for state (should be properties instead)
- Hardcoded tag names in CSS or logic
- Commits that should be `feat` marked as `fix` or vice versa (affects semver)
