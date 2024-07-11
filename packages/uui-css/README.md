# uui-css

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-css?logoColor=%231B264F)

UUI-CSS package contains css files which can be included in your project or components if needed

- **custom-properties.css** — use this if you like to include our custom properties in your project.
- **uui-font.css** — use this if you like to import our font in your project. You must set the `uui-font` class on your root element.
- **uui-text.css** — use this if you like to declare styles for typography for tags such as h1, h2. This is used in companionship with `uui-font`. Set the `uui-text` class on the element covering the scope of interest, this can be your root element. And if you want to use the styling inside a Shadow dom, that will have to have the `uui-text` class as well. See Applying the uui-css styling in the root.
  [See examples](#Usage)

Bundle:

- **uui-css.css** — If you like your project to be styled for Umbraco UI, then include this in the root of your project. This contains all the previous files, so make sure to only include this file in your project if you need to style your project. You will still have to apply the `uui-font` and `uui-text` classes.

### See it in action

Preview on [Storybook](https://uui.umbraco.com/?path=/docs/uui-)

# Usage in your project

## CDN

For the best results you should include the `uui-css.css` bundle in your project, which contains all the css files and custom variables:

```html
<!-- Latest Version -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-css@latest/dist/uui-css.css" />

<!-- Specific version -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-css@x.x.x/dist/uui-css.css" />
```

## Installation

If you want to have fine-grained control over the CSS files, you can install the `@umbraco-ui/uui-css` package.

```zsh
npm i @umbraco-ui/uui-css
```

## Usage

For a build system like [Vite](https://vitejs.dev/), the styling could be included like this if you want to control the styling and variables with the build system:

```ts
// app.ts
import '@umbraco-ui/uui-css/dist/custom-properties.css';
import '@umbraco-ui/uui-css/dist/uui-font.css';
import '@umbraco-ui/uui-css/dist/uui-text.css';
```

Or you can just import the compiled bundle at once:

```ts
// app.ts
import '@umbraco-ui/uui-css/dist/uui-css.css';
```

### Applying the uui-css styling in the root

Using the `uui-font` and `uui-text`

```html
<body class="uui-font uui-text">
  <div id="app">
    <h1>Hello uui-css!</h1>
    <p>
      Everything inside my app will now use the font from uui-font and tag
      styling from uui-text because the root(body) has the uui-font and uui-text
      classes.
    </p>
  </div>
</body>
```

Using the custom properties:

```html
<p style="background: var(--uui-interface-surface-alt);">
  I will now have a background color from the custom properties.
</p>
```

Full example:

```html
<!doctype html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-css@latest/dist/uui-css.css" />
  </head>
  <body class="uui-font uui-text">
    <div id="app">
      <h1>Hello uui-css!</h1>
      <p>
        Everything inside my app will now use the font from uui-font and tag
        styling from uui-text because the root(body) has the uui-font and
        uui-text classes.
      </p>
      <p style="background: var(--uui-interface-surface-alt);">
        I will have a background color from the custom properties.
      </p>
    </div>
  </body>
</html>
```

### Applying uui-text in a component

Import the text css from uui-css

```js
import { UUITextStyles } from '@umbraco-ui/uui-css';
```

Add the css to the component styles

```js
static styles = [
  UUITextStyles,
  css`
  /* your css goes here */
`,
];
```

Add the `uui-text` class to the root of the component

```html
<div class="uui-text">This is my custom element</div>
```

Full example:

```js
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css';

@customElement('my-element')
export class MyElement extends LitElement {
  render() {
    return html`
      <div class="uui-text">
        This is my custom element
      </div>
    `;
  }

  static styles = [
    UUITextStyles,
    css`
      /* your css goes here */
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
```
