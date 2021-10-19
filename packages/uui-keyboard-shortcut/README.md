# uui-input

## Usage

```zsh
npm i @umbraco-ui/uui-keyboard-shortcut
```

Import the registration of `<uui-keyboard-shortcut>` via:

```javascript
import '@umbraco-ui/uui-keyboard-shortcut/lib';
```

When looking to leverage the `UUIKeyboardShortcutElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIKeyboardShortcutElement } from '@umbraco-ui/uui-keyboard-shortcut/lib/uui-keyboard-shortcut.element';
```

## Example

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
