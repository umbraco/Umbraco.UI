# uui-symbol-drag-handle

Umbraco style drag handle symbol component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-symbol-drag-handle--overview)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-symbol-drag-handle>` via:

```javascript
import '@umbraco-ui/uui/components/symbol-drag-handle/symbol-drag-handle.js';
```

When looking to leverage the `UUISymbolDragHandleElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISymbolDragHandleElement } from '@umbraco-ui/uui/components/symbol-drag-handle/symbol-drag-handle.element.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-symbol-drag-handle label="Drag Handle"></uui-symbol-drag-handle>
```
