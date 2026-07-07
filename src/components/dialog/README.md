# uui-dialog

Umbraco style dialog component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-dialog--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-dialog>` via:

```javascript
import '@umbraco-ui/uui/components/dialog/dialog.js';
```

When looking to leverage the `UUIDialogElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIDialogElement } from '@umbraco-ui/uui/components/dialog/dialog.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-dialog></uui-dialog>
```
