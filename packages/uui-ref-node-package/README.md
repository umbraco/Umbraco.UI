# uui-ref-node-package

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-package?logoColor=%231B264F)

Umbraco style ref-node-package component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-ref-node-package
```

Import the registration of `<uui-ref-node-package>` via:

```javascript
import '@umbraco-ui/uui-ref-node-package/lib';
```

When looking to leverage the `UUIRefNodePackageElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefNodePackageElement } from '@umbraco-ui/uui-ref-node-package/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref-node-package@latest/dist/uui-ref-node-package.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref-node-package@X.X.X/dist/uui-ref-node-package.min.js"></script>
```

## Usage

```html
<uui-ref-node-package></uui-ref-node-package>
```
