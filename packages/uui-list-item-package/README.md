# uui-list-item-package

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-list-item-package?logoColor=%231B264F)

Umbraco style list-item-package component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-list-item-package
```

Import the registration of `<uui-list-item-package>` via:

```javascript
import '@umbraco-ui/uui-list-item-package/lib';
```

When looking to leverage the `UUIListItemPackageElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIListItemPackageElement } from '@umbraco-ui/uui-list-item-package/lib/uui-list-item-package.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-package@latest/dist/uui-list-item-package.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-package@X.X.X/dist/uui-list-item-package.min.js"></script>
```

## Usage

```html
<uui-list-item-package></uui-list-item-package>
```
