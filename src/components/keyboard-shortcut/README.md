# uui-keyboard-shortcut

Visual representation of keyboard shortcut key sequences.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-keyboard-shortcut--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-key>` and `<uui-keyboard-shortcut>` via:

```javascript
import '@umbraco-ui/uui/components/keyboard-shortcut/keyboard-shortcut.js';
```

When looking to leverage the `UUIKeyElement` and `UUIKeyboardShortcutElement` base class as a type and/or for extension purposes, do so via:

```javascript
import {
  UUIKeyElement,
  UUIKeyboardShortcutElement,
} from '@umbraco-ui/uui/components/keyboard-shortcut/keyboard-shortcut.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
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
