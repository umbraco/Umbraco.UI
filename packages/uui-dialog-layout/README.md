# uui-dialog-layout

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-dialog-layout?logoColor=%231B264F)

Umbraco style dialog-layout component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-dialog-layout
```

Import the registration of `<uui-dialog-layout>` via:

```javascript
import '@umbraco-ui/uui-dialog-layout/lib';
```

When looking to leverage the `UUIDialogLayoutElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIDialogLayoutElement } from '@umbraco-ui/uui-dialog-layout/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-dialog-layout@latest/dist/uui-dialog-layout.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-dialog-layout@X.X.X/dist/uui-dialog-layout.min.js"></script>
```

## Usage

```html
<uui-dialog-layout></uui-dialog-layout>
```
