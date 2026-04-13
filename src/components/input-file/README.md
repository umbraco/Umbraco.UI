# uui-input-file

Umbraco style input-file component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-input-file--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-input-file>` via:

```javascript
import '@umbraco-ui/uui/components/input-file/input-file.js';
```

When looking to leverage the `UUIInputFileElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputFileElement } from '@umbraco-ui/uui/components/input-file/input-file.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-input-file></uui-input-file>
```
