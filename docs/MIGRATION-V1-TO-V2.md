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

### New exports

v2 exports `UUI_VERSION` (the package version string) and registers itself in `globalThis.__uuiVersions` for multi-instance detection. See [EXPORTS.md](EXPORTS.md) for details.

### Removed components

These deprecated components were removed in v2:

- `uui-caret` — replaced by `uui-symbol-expand`
- `uui-popover` — replaced by `uui-popover-container` (native Popover API)

## Automated import migration

A [jscodeshift](https://github.com/facebook/jscodeshift) transform is included in this repo to rewrite imports automatically. It handles component imports, foundation/CSS imports, re-exports, dynamic `import()` calls, and path-based references to `uui-css` dist/assets in config files.

```bash
# Download the transform
curl -sLO https://raw.githubusercontent.com/umbraco/Umbraco.UI/main/scripts/codemods/v2.0.0/update-imports.ts

# Dry-run (preview without writing)
npx jscodeshift -t update-imports.ts --parser tsx --extensions=ts,tsx,js,jsx --ignore-pattern='**/node_modules/**' -d ./src

# Apply changes
npx jscodeshift -t update-imports.ts --parser tsx --extensions=ts,tsx,js,jsx --ignore-pattern='**/node_modules/**' ./src

# If your project uses TypeScript 5 standard decorators (not experimentalDecorators),
# add --parser-config to tell Babel which decorator syntax to expect:
npx jscodeshift -t update-imports.ts --parser tsx --parser-config '{"plugins":[["decorators",{"version":"2023-11"}]]}' --extensions=ts,tsx,js,jsx --ignore-pattern='**/node_modules/**' ./src

# Clean up
rm update-imports.ts
```

The codemod only processes JS/TS files. If you reference `uui-css.css` in HTML files (e.g. `<link>` tags), update those manually:

```diff
- <link rel="stylesheet" href="./path/to/uui-css.css" />
+ <link rel="stylesheet" href="./path/to/light.css" />
```

After running the codemod, follow the remaining manual steps below (dependency cleanup, removed components, Lit upgrade).

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

### 4. Renamed types

The global `Option` interface (previously declared by `uui-select`) has been replaced with an exported `UUISelectOption` interface. The type shape is unchanged, so existing code will continue to work at runtime. If you reference `Option` as a type annotation, TypeScript will prompt you to add the import:

```diff
- const options: Array<Option> = [{ name: 'A', value: 'a' }];
+ import type { UUISelectOption } from '@umbraco-ui/uui/components/select/select.element.js';
+ const options: Array<UUISelectOption> = [{ name: 'A', value: 'a' }];
```

### 5. Removed public methods on color components

The `getBrightness()` and `getLightness()` methods have been removed from `UUIColorAreaElement` and `UUIColorPickerElement`. These were HSB↔HSL conversion helpers that have been moved to shared utility functions.

If you were calling these methods on a component instance, use the standalone functions instead:

```diff
- const brightness = colorArea.getBrightness(lightness);
+ import { brightnessFromLightness } from '@umbraco-ui/uui';
+ const brightness = brightnessFromLightness(saturation, lightness);

- const lightness = colorArea.getLightness(brightness);
+ import { lightnessFromBrightness } from '@umbraco-ui/uui';
+ const lightness = lightnessFromBrightness(saturation, brightness);
```

Note: the shared functions require an explicit `saturation` parameter (the old methods used `this.saturation` implicitly).

### 6. Color picker: colord replaced by culori

v1 bundled [colord](https://github.com/omgovich/colord) internally. v2 uses [culori](https://github.com/Evercoder/culori) instead, which is an external dependency.

**For bundler users:** nothing to do — `culori` is listed as a `dependency` of `@umbraco-ui/uui` and is installed automatically.

**For import-map / bundler-free users:** add a `culori` entry to your import map:

```diff
  {
    "imports": {
      "lit": "https://esm.run/lit",
+     "culori": "https://esm.run/culori",
      "@umbraco-ui/uui/": "https://cdn.jsdelivr.net/npm/@umbraco-ui/uui@2/dist/"
    }
  }
```

**Color output format change:** `uui-color-picker` and `uui-color-area` both now emit values using modern CSS space-separated syntax. The alpha channel is always included (even when fully opaque). If you were parsing the emitted value string, update your expectations:

| Component          | Format                          | v1 output                                 | v2 output                                 |
| ------------------ | ------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `uui-color-picker` | `rgb`                           | `rgb(255, 0, 0)`                          | `rgb(255 0 0 / 1)`                        |
| `uui-color-picker` | `rgba`                          | `rgba(255, 0, 0, 0.5)`                    | `rgb(255 0 0 / 0.5)`                      |
| `uui-color-picker` | `hsl`                           | `hsl(0, 100%, 50%)`                       | `hsl(0 100% 50% / 1)`                     |
| `uui-color-picker` | `hsla`                          | `hsla(0, 100%, 50%, 0.8)`                 | `hsl(0 100% 50% / 0.8)`                   |
| `uui-color-picker` | `hex` / `hexa` / `hsv` / `hsva` | unchanged                                 | unchanged                                 |
| `uui-color-area`   | (always rgb)                    | `rgb(255, 0, 0)` / `rgba(255, 0, 0, 0.5)` | `rgb(255 0 0 / 1)` / `rgb(255 0 0 / 0.5)` |

Both old and new formats are valid CSS. Any CSS parser (or `parseColor` from UUI itself) will accept either.

**`HslaColor` type:** if you imported `HslaColor` from `colord`, use UUI's own export instead:

```diff
- import type { HslaColor } from 'colord';
+ import type { HslaColor } from '@umbraco-ui/uui';
```

### 7. Handle removed components

If you used `uui-caret` or `uui-popover`, replace them:

```diff
- <uui-caret></uui-caret>
+ <uui-symbol-expand></uui-symbol-expand>

- <uui-popover ...>
+ <uui-popover-container ...>
```

### 8. Update Lit to v3

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
