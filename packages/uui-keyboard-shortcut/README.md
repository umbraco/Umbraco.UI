# uui-keyboard-shortcut

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-keyboard-shortcut?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-keyboard-shortcut)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-keyboard-shortcut--docs)

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
