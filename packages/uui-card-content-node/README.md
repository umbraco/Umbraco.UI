# uui-card-content-node

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-content-node?logoColor=%231B264F)

Umbraco style card-content-node component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-card-content-node
```

Import the registration of `<uui-card-content-node>` via:

```javascript
import '@umbraco-ui/uui-card-content-node/lib';
```

When looking to leverage the `UUICardContentNodeElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUICardContentNodeElement } from '@umbraco-ui/uui-card-content-node/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-card-content-node@latest/dist/uui-card-content-node.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-card-content-node@X.X.X/dist/uui-card-content-node.min.js"></script>
```

## Usage

```html
<uui-card-content-node></uui-card-content-node>
```
