# Using UUI without a bundler

You can use UUI components directly in the browser without a build step by setting up an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap). This tells the browser where to resolve `lit` and `@umbraco-ui/uui` imports from a CDN.

## Quick start

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UUI Import Map Example</title>

    <!-- UUI theme -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui@2/dist/themes/light.css" />

    <!-- Import map: tell the browser where to find Lit and UUI -->
    <script type="importmap">
      {
        "imports": {
          "lit": "https://esm.run/lit",
          "@umbraco-ui/uui/": "https://cdn.jsdelivr.net/npm/@umbraco-ui/uui@2/dist/"
        }
      }
    </script>
  </head>
  <body>
    <uui-button look="primary" label="Hello UUI"></uui-button>

    <script type="module">
      // Import only the components you need
      import '@umbraco-ui/uui/components/button/button.js';
    </script>
  </body>
</html>
```

## How it works

UUI's published `dist/` directory preserves the module structure, so each component is available as an individual ES module. The import map resolves:

- **`lit`** and its sub-packages from jsdelivr (UUI's only runtime dependency)
- **`@umbraco-ui/uui/`** pointing to the `dist/` directory on jsdelivr

The browser fetches only the modules you actually import, so you get automatic tree-shaking without a bundler.

## Cherry-picking components

Import only what you use to keep page loads fast:

```js
// Just a button
import '@umbraco-ui/uui/components/button/button.js';

// A form with validation
import '@umbraco-ui/uui/components/form/form.js';
import '@umbraco-ui/uui/components/input/input.js';
import '@umbraco-ui/uui/components/label/label.js';
```

## Loading everything

If you want all components registered at once:

```js
import '@umbraco-ui/uui';
```

Note: this will fetch all ~80 component modules, so cherry-picking is recommended for production.

## Browser support

Import maps are supported in all modern browsers. See [Can I use: import maps](https://caniuse.com/import-maps).
