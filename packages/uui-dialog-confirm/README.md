# uui-dialog-confirm

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-dialog-confirm?logoColor=%231B264F)

Umbraco style dialog-confirm component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-dialog-confirm
```

Import the registration of `<uui-dialog-confirm>` via:

```javascript
import '@umbraco-ui/uui-dialog-confirm/lib';
```

When looking to leverage the `UUIDialogConfirmElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIDialogConfirmElement } from '@umbraco-ui/uui-dialog-confirm/lib/uui-dialog-confirm.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-dialog-confirm@latest/dist/uui-dialog-confirm.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-dialog-confirm@X.X.X/dist/uui-dialog-confirm.min.js"></script>
```

## Usage

```html
<uui-dialog-confirm></uui-dialog-confirm>
```
