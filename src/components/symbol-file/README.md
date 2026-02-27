# uui-symbol-file

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-symbol-file--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-symbol-file>` via:

```javascript
import '@umbraco-ui/uui/components/symbol-file/symbol-file.js';
```

When looking to leverage the `UUISymbolFileElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISymbolFileElement } from '@umbraco-ui/uui/components/symbol-file/symbol-file.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-symbol-file type="pdf"></uui-symbol-file>
```
