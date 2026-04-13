# uui-file-preview

Umbraco style file-preview component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-file-preview--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-file-preview>` via:

```javascript
import '@umbraco-ui/uui/components/file-preview/file-preview.js';
```

When looking to leverage the `UUIFilePreviewElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIFilePreviewElement } from '@umbraco-ui/uui/components/file-preview/file-preview.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-file-preview></uui-file-preview>
```
