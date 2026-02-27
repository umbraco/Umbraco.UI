# uui-file-dropzone

Umbraco style file-dropzone component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-file-dropzone--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-file-dropzone>` via:

```javascript
import '@umbraco-ui/uui/components/file-dropzone/file-dropzone.js';
```

When looking to leverage the `UUIFileDropzoneElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIFileDropzoneElement } from '@umbraco-ui/uui/components/file-dropzone/file-dropzone.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-file-dropzone></uui-file-dropzone>
```
