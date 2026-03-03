# Theming

UUI ships three themes as standalone CSS files. Load one as a `<link>` tag and it provides all CSS custom properties, typography, and font-face declarations needed to use the components.

## Available themes

| File                       | Description                           |
| -------------------------- | ------------------------------------- |
| `themes/light.css`         | Default light theme                   |
| `themes/dark.css`          | Dark theme                            |
| `themes/high-contrast.css` | High contrast theme for accessibility |

## Basic usage

Pick a theme and link it in your HTML:

```html
<link
  rel="stylesheet"
  href="node_modules/@umbraco-ui/uui/dist/themes/light.css" />
```

Then apply `uui-font` and `uui-text` to the element that should carry UUI typography — typically `<body>`:

```html
<body class="uui-font uui-text">
  ...
</body>
```

## Automatic dark mode (OS preference)

To follow the user's OS-level light/dark preference automatically, load both themes with `media` attributes:

```html
<link
  rel="stylesheet"
  href="node_modules/@umbraco-ui/uui/dist/themes/light.css"
  media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" />
<link
  rel="stylesheet"
  href="node_modules/@umbraco-ui/uui/dist/themes/dark.css"
  media="(prefers-color-scheme: dark)" />
```

The browser fetches both files but only applies the one that matches. Switching OS preference updates the active theme with no JavaScript required.

> **Note:** Both theme files include the shared base (fonts, sizes, palette). With both loaded, the base CSS is fetched twice. This is harmless but adds a small download overhead. If that matters, consider loading only one theme and toggling via JavaScript instead (see below).

## Manual theme switching (JavaScript)

To let users switch themes without a page reload, swap the stylesheet `href` at runtime:

```js
const themeLink = document.querySelector('link[data-uui-theme]');

function setTheme(theme) {
  themeLink.href = `node_modules/@umbraco-ui/uui/dist/themes/${theme}.css`;
}

setTheme('dark'); // switch to dark
setTheme('light'); // switch back
```

```html
<link
  data-uui-theme
  rel="stylesheet"
  href="node_modules/@umbraco-ui/uui/dist/themes/light.css" />
```

You can combine both approaches — start with the OS preference and allow manual override:

```js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(prefersDark ? 'dark' : 'light');
```
