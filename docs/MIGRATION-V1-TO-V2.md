# Migrating from UUI v1 to v2

## What changed

In v1, UUI was a monorepo of ~84 individual npm packages (`@umbraco-ui/uui-button`, `@umbraco-ui/uui-input`, etc.). Each component had its own `package.json`, build config, and version.

In v2, everything is published as a **single package**: `@umbraco-ui/uui`. Components are available as individual ES module entry points for tree-shaking.

### Architecture changes

|                   | v1                                                                                  | v2                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Package**       | 84 separate `@umbraco-ui/uui-*` packages                                            | Single `@umbraco-ui/uui` package                                                  |
| **Install**       | `npm install @umbraco-ui/uui-button`                                                | `npm install @umbraco-ui/uui`                                                     |
| **Import**        | `import '@umbraco-ui/uui-button';`                                                  | `import '@umbraco-ui/uui/components/button/button.js';`                           |
| **Deep import**   | `import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';` | `import { UUIButtonElement } from '@umbraco-ui/uui/components/button/button.js';` |
| **Bundle import** | `import '@umbraco-ui/uui';`                                                         | `import '@umbraco-ui/uui';` (unchanged)                                           |
| **Foundation**    | `@umbraco-ui/uui-base`                                                              | `@umbraco-ui/uui` (re-exported from root)                                         |
| **CSS**           | `@umbraco-ui/uui-css`                                                               | `@umbraco-ui/uui` (re-exported from root)                                         |
| **Build**         | Rollup per package, orchestrated by Turbo                                           | Single Vite build                                                                 |
| **Lit**           | ^2.8.0                                                                              | ^3.0.0                                                                            |

### Removed components

These deprecated components were removed in v2:

- `uui-caret` — replaced by `uui-symbol-expand`
- `uui-popover` — replaced by `uui-popover-container` (native Popover API)

## Automated import migration

A [jscodeshift](https://github.com/facebook/jscodeshift) transform is included in this repo to rewrite imports automatically. It handles component imports, foundation/CSS imports, re-exports, and dynamic `import()` calls.

```bash
# Download the transform
curl -sLO https://raw.githubusercontent.com/umbraco/Umbraco.UI/main/scripts/codemods/v2.0.0/update-imports.ts

# Dry-run (preview without writing)
npx jscodeshift -t update-imports.ts --parser tsx --extensions=ts,tsx,js,jsx ./src

# Apply changes
npx jscodeshift -t update-imports.ts --parser tsx --extensions=ts,tsx,js,jsx --no-dry ./src

# Clean up
rm update-imports.ts
```

After running the codemod, follow the remaining manual steps below (dependency cleanup, theme references, removed components, Lit upgrade).

## Step-by-step migration

### 1. Update your dependencies

Remove all individual UUI packages and install the single package:

```sh
# Remove old packages
npm uninstall @umbraco-ui/uui-button @umbraco-ui/uui-input @umbraco-ui/uui-base ...

# Install v2
npm install @umbraco-ui/uui
```

Or if you were using the bundle package:

```sh
npm install @umbraco-ui/uui@latest
```

### 2. Update imports

#### Component imports

```diff
- import '@umbraco-ui/uui-button';
+ import '@umbraco-ui/uui/components/button/button.js';

- import '@umbraco-ui/uui-input';
+ import '@umbraco-ui/uui/components/input/input.js';
```

#### Class and type imports

```diff
- import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';
+ import { UUIButtonElement } from '@umbraco-ui/uui/components/button/button.js';

- import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';
+ import type { UUIButtonElement } from '@umbraco-ui/uui/components/button/button.js';
```

#### Foundation imports (uui-base)

```diff
- import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
+ import { defineElement } from '@umbraco-ui/uui';

- import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
+ import { LabelMixin } from '@umbraco-ui/uui';

- import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
+ import { UUIEvent } from '@umbraco-ui/uui';
```

#### CSS imports (uui-css)

```diff
- import { UUITextStyles } from '@umbraco-ui/uui-css/lib/uui-text.styles';
+ import { UUITextStyles } from '@umbraco-ui/uui';
```

#### Bundle import (unchanged)

```js
// This still works exactly the same
import '@umbraco-ui/uui';
```

### 3. Update theme/CSS references

```diff
- <link rel="stylesheet" href="node_modules/@umbraco-ui/uui-css/dist/uui-css.css" />
+ <link rel="stylesheet" href="node_modules/@umbraco-ui/uui/dist/themes/light.css" />
```

### 4. Handle removed components

If you used `uui-caret` or `uui-popover`, replace them:

```diff
- <uui-caret></uui-caret>
+ <uui-symbol-expand></uui-symbol-expand>

- <uui-popover ...>
+ <uui-popover-container ...>
```

### 5. Update Lit to v3

UUI v2 requires Lit ^3.0.0. If your project uses Lit 2, follow the [Lit 2 to 3 upgrade guide](https://lit.dev/docs/releases/upgrade/#lit-2x-to-3.0).

## Import mapping reference

The general pattern for translating v1 imports to v2:

| v1 pattern                           | v2 pattern                                    |
| ------------------------------------ | --------------------------------------------- |
| `@umbraco-ui/uui-{name}`             | `@umbraco-ui/uui/components/{name}/{name}.js` |
| `@umbraco-ui/uui-{name}/lib/{file}`  | `@umbraco-ui/uui/components/{name}/{file}.js` |
| `@umbraco-ui/uui-base`               | `@umbraco-ui/uui`                             |
| `@umbraco-ui/uui-base/lib/{subpath}` | `@umbraco-ui/uui`                             |
| `@umbraco-ui/uui-css/lib/{file}`     | `@umbraco-ui/uui`                             |

## Using without a bundler

v2 supports browser-native [import maps](USAGE-WITHOUT-BUNDLER.md) for bundler-free usage.
