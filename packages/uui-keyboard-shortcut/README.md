# uui-keyboard-shortcut

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-keyboard-shortcut?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-keyboard-shortcut)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-keyboard-shortcut
```

Import the registration of `<uui-keyboard-shortcut>` via:

```javascript
import '@umbraco-ui/uui-keyboard-shortcut';
```

When looking to leverage the `UUIKeyboardShortcutElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIKeyboardShortcutElement } from '@umbraco-ui/uui-keyboard-shortcut';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-keyboard-shortcut@latest/dist/uui-keyboard-shortcut.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-keyboard-shortcut@X.X.X/dist/uui-keyboard-shortcut.min.js"></script>
```

## Usage

```html
<uui-keyboard-shortcut>
  <uui-key>ALT</uui-key>
  +
  <uui-key>shift</uui-key>
  +
  <uui-key>&#8593;</uui-key>
  +
  <uui-key>z</uui-key>
</uui-keyboard-shortcut>
```
