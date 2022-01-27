# uui-dialog

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-dialog?logoColor=%231B264F)

Umbraco style dialog component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-dialog
```

Import the registration of `<uui-dialog>` via:

```javascript
import '@umbraco-ui/uui-dialog/lib';
```

When looking to leverage the `UUIDialogElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIDialogElement } from '@umbraco-ui/uui-dialog/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-dialog@latest/dist/uui-dialog.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-dialog@X.X.X/dist/uui-dialog.min.js"></script>
```

## Usage

```html
<uui-dialog></uui-dialog>
```
