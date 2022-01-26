# uui-color-picker

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-picker?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-color-picker)

Umbraco style color-picker component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-color-picker
```

Import the registration of `<uui-color-picker>` via:

```javascript
import '@umbraco-ui/uui-color-picker/lib';
```

When looking to leverage the `UUIColorPickerElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIColorPickerElement } from '@umbraco-ui/uui-color-picker/lib/uui-color-picker.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-color-picker@latest/dist/uui-color-picker.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-color-picker@X.X.X/dist/uui-color-picker.min.js"></script>
```

## Usage

```html
<uui-color-picker></uui-color-picker>
```
