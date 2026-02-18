# Single-Package Migration Plan

Reference for migrating the remaining ~72 component packages from `packages/uui-{name}/` to `src/components/{name}/`. Created during the spike (PR #1286) to capture patterns, gotchas, and decisions.

## ADO Work Items

- **Epic #16465** — Umbraco UI Library
- **Feature #65026** — Single-package migration
- **PBI #65021** — Spike (this PR, done)
- **PBI #65022** — Consolidate monorepo into single package
- **PBI #65023** — Validate tree-shaking and bundle size with backoffice
- **PBI #65024** — Consumer migration tooling (codemod + docs)
- **PBI #65025** — Deprecate old @umbraco-ui/\* packages on npm
- **Task #65184** — Fix Chai assertion style in tests

## Already migrated (spike)

| Old package                   | New location                                          |
| ----------------------------- | ----------------------------------------------------- |
| `uui-base`                    | `src/internal/` (mixins, events, utils, registration) |
| `uui-css`                     | `src/styles/` + `src/themes/`                         |
| `uui-badge`                   | `src/components/badge/`                               |
| `uui-button`                  | `src/components/button/`                              |
| `uui-dialog`                  | `src/components/dialog/`                              |
| `uui-dialog-layout`           | `src/components/dialog-layout/`                       |
| `uui-icon`                    | `src/components/icon/`                                |
| `uui-icon-registry`           | `src/components/icon-registry/`                       |
| `uui-icon-registry-essential` | `src/components/icon-registry-essential/`             |
| `uui-input`                   | `src/components/input/`                               |
| `uui-input-password`          | `src/components/input-password/`                      |
| `uui-table` (6 sub-elements)  | `src/components/table/`                               |

## Remaining packages (~72)

Listed in `packages/`. Includes `rollup-package.config.mjs` (delete when last package is migrated) and `uui` (the old bundle package — delete entirely, replaced by root `src/index.ts`).

---

## Per-component migration steps

### 1. Copy source files

Copy from `packages/uui-{name}/lib/` to `src/components/{name}/`:

- `*.element.ts` — component source
- `*.test.ts` — tests
- `*.story.ts` — Storybook stories
- `index.ts` — barrel exports

Also copy `README.md` from `packages/uui-{name}/README.md` (one level up from `lib/`).

**Do NOT copy**: `*.js`, `*.d.ts`, `rollup.config.js`, `package.json`, `tsconfig.json`, `tsconfig.tsbuildinfo`, `CHANGELOG.md`, `custom-elements.json`, `.turbo/`, `.DS_Store`.

### 2. Fix imports in element files

Replace all `@umbraco-ui/*` imports with relative paths to `src/`.

#### uui-base imports → `../../internal/`

| Old import                              | New import                    |
| --------------------------------------- | ----------------------------- |
| `@umbraco-ui/uui-base/lib/registration` | `../../internal/registration` |
| `@umbraco-ui/uui-base/lib/mixins`       | `../../internal/mixins`       |
| `@umbraco-ui/uui-base/lib/events`       | `../../internal/events`       |
| `@umbraco-ui/uui-base/lib/utils`        | `../../internal/utils`        |
| `@umbraco-ui/uui-base/lib/animations`   | `../../internal/animations`   |
| `@umbraco-ui/uui-base/lib/types`        | `../../internal/types`        |

#### uui-css imports → `../../styles/`

| Old import                | New import     |
| ------------------------- | -------------- |
| `@umbraco-ui/uui-css/lib` | `../../styles` |

5 components import `UUITextStyles` from uui-css: `uui-box`, `uui-card`, `uui-symbol-file`, `uui-toast-notification`, `uui-toast-notification-layout`.

#### Sibling component imports → `../{name}/`

| Old import                                      | New import                        |
| ----------------------------------------------- | --------------------------------- |
| `@umbraco-ui/uui-{name}/lib`                    | `../{name}/index.js`              |
| `@umbraco-ui/uui-{name}/lib/uui-{name}.element` | `../{name}/uui-{name}.element.js` |

#### Icon imports

| Old import                                         | New import             |
| -------------------------------------------------- | ---------------------- |
| `@umbraco-ui/uui-icon-registry-essential/lib/svgs` | `../../icons/index.js` |

### 3. Fix imports in story files

Stories need extra attention because the old directory structure differs:

- **README import**: Change `../README.md?raw` → `./README.md?raw` (README is now colocated, no longer one level up)
- **Sibling component imports**: Same as element files (use relative `../{name}/` paths)
- **Storyhelper imports**: Adjust depth — old was `../../../../storyhelpers`, new is `../../../storyhelpers` (one fewer level since no `lib/` subdirectory)
- **Unmigrated dependencies**: If a story imports components not yet migrated, either:
  - Comment out with `// TODO: uncomment after {name} is migrated`
  - Or migrate the dependency first

### 4. Fix imports in test files

Usually only need the uui-base import fixes. Tests rarely import sibling components.

### 5. Add to barrel export

Add to `src/index.ts`:

```ts
export * from './components/{name}/index.js';
```

### 6. Verify

```bash
npm run build    # Vite build + tsc + analyze
npm test         # All tests pass
```

### 7. Delete old package

```bash
rm -rf packages/uui-{name}
```

### 8. Commit

One commit per component or batch of related components.

---

## Migration order (suggested)

Migrate leaf components first (no sibling dependencies), then work inward. This avoids needing to comment out imports.

### Tier 1 — No sibling dependencies (only uui-base)

These only import from `uui-base` and can be migrated in any order:

`uui-action-bar`, `uui-avatar`, `uui-boolean-input`, `uui-breadcrumbs`, `uui-checkbox`, `uui-color-area`, `uui-color-slider`, `uui-color-swatch`, `uui-form`, `uui-form-layout-item`, `uui-form-validation-message`, `uui-keyboard-shortcut`, `uui-label`, `uui-loader`, `uui-loader-bar`, `uui-loader-circle`, `uui-modal`, `uui-popover-container`, `uui-progress-bar`, `uui-radio`, `uui-range-slider`, `uui-responsive-container`, `uui-scroll-container`, `uui-select`, `uui-slider`, `uui-symbol-expand`, `uui-symbol-file`, `uui-symbol-folder`, `uui-symbol-lock`, `uui-symbol-more`, `uui-symbol-sort`, `uui-tag`, `uui-textarea`, `uui-toggle`, `uui-visually-hidden`

### Tier 2 — Depend on uui-base + uui-css (UUITextStyles)

Migrate after tier 1 (uui-css is already in `src/styles/`):

`uui-box`, `uui-symbol-file` (also uui-css)

### Tier 3 — Depend on migrated tier 1/2 components

These import sibling components. Migrate after their dependencies:

- `uui-avatar-group` → depends on `uui-avatar`
- `uui-button-group` → depends on `uui-button`
- `uui-button-inline-create` → depends on `uui-button`
- `uui-card` → depends on `uui-base` + `uui-css`
- `uui-card-block-type` → depends on `uui-card`
- `uui-card-content-node` → depends on `uui-card`, `uui-icon`
- `uui-card-media` → depends on `uui-card`
- `uui-card-user` → depends on `uui-card`
- `uui-color-swatches` → depends on `uui-color-swatch`
- `uui-combobox-list` → depends on `uui-base`
- `uui-combobox` → depends on `uui-combobox-list`, `uui-popover-container`, `uui-icon-registry-essential`
- `uui-file-dropzone` → depends on `uui-symbol-file-dropzone`
- `uui-file-preview` → depends on `uui-symbol-file-thumbnail`, `uui-icon`
- `uui-input-file` → depends on `uui-file-dropzone`, `uui-button`, `uui-file-preview`
- `uui-input-lock` → depends on `uui-input`, `uui-icon-registry-essential`
- `uui-menu-item` → depends on `uui-symbol-expand`, `uui-loader-bar`
- `uui-pagination` → depends on `uui-button`, `uui-button-group`, `uui-icon-registry-essential`
- `uui-ref` → depends on `uui-base`
- `uui-ref-list` → depends on `uui-ref`
- `uui-ref-node` → depends on `uui-ref`, `uui-icon`
- `uui-ref-node-*` (6 variants) → depends on `uui-ref-node`
- `uui-symbol-file-dropzone` → depends on `uui-base`
- `uui-symbol-file-thumbnail` → depends on `uui-symbol-file`, `uui-icon`
- `uui-tabs` → depends on `uui-base`
- `uui-toast-notification` → depends on `uui-base`, `uui-css`, `uui-icon-registry-essential`
- `uui-toast-notification-container` → depends on `uui-toast-notification`
- `uui-toast-notification-layout` → depends on `uui-css`, `uui-button`
- `uui-button-copy-text` → depends on `uui-button`, `uui-icon-registry-essential`
- `uui-color-picker` → depends on `uui-color-area`, `uui-color-slider`, `uui-color-swatches`, `uui-button`, `uui-input`, `uui-popover-container`

---

## Known gotchas

### README path change

Old: stories in `lib/` referenced `../README.md?raw` (README was at package root).
New: stories are colocated with README, use `./README.md?raw`.

### Storyhelper import depth

Old: `packages/uui-{name}/lib/*.story.ts` → `../../../../storyhelpers`
New: `src/components/{name}/*.story.ts` → `../../../storyhelpers`

### `.js` extensions on imports

The spike is inconsistent — some imports have `.js` extensions, some don't. This needs a single cleanup pass (deferred). During migration, try to apply .js or index.js extensions consistently.

### `demandCustomElement` calls

18 components use `demandCustomElement()` to warn if a sibling isn't registered. In the single-package model this is dead code since all components are always available. However, they may serve a purpose if someone were to import a single component directly from `src/components/{name}/` instead of the root barrel. But they are used inconsistently. If you come across a component that clearly uses another component without a `demandCustomElement` call, feel free to add it. On the contrary, if you see a `demandCustomElement` call for a component that isn't actually used, feel free to remove it. If you see an import of a component without a `demandCustomElement` call, feel free to add a TODO comment to add it later.

### `UUITextStyles` from uui-css

5 components import `UUITextStyles` from `@umbraco-ui/uui-css/lib`. The new path is `../../styles` (from `src/styles/uui-text.styles.ts`).

### Stories with many unmigrated dependencies

Some stories (like `uui-table-advanced-example.ts`) reference so many unmigrated components they're not worth migrating until all dependencies are in place. Skip them and add a TODO.

### Build artifacts in old packages

Old packages may contain checked-in build artifacts (`.js`, `.d.ts` in `lib/`). Only copy `.ts` source files. The `custom-elements.json`, `tsconfig.tsbuildinfo`, and `.turbo/` are all build artifacts — ignore them.

---

## Packages to delete (non-component)

After all components are migrated:

| Package                              | Action                                                   |
| ------------------------------------ | -------------------------------------------------------- |
| `packages/uui/`                      | Delete entirely — replaced by root `src/index.ts` barrel |
| `packages/rollup-package.config.mjs` | Delete — Vite replaces Rollup                            |

---

## Post-migration tasks

1. **Add .js extensions** consistently to all internal imports (single `sed` pass)
2. **Clean up `package.json`** scripts — remove any leftover monorepo scripts
3. **Update `custom-elements` manifest** — `npm run analyze` regenerates it
4. **Validate tree-shaking** (PBI #65023) — build backoffice with single package, compare bundle sizes
5. **Create codemod** (PBI #65024) — automate consumer migration from `@umbraco-ui/uui-{name}` to `@umbraco-ui/uui`
6. **Deprecate old packages** (PBI #65025) — publish final versions pointing to new package
7. **Fix Chai assertion style** (Task #65184) — `to.exist` → `to.be.not(null)` etc.
