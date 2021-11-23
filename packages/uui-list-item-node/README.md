# uui-list-item-node

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-list-item-node?logoColor=%231B264F)

Umbraco style list-item-node component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-list-item-node
```

Import the registration of `<uui-list-item-node>` via:

```javascript
import '@umbraco-ui/uui-list-item-node/lib';
```

When looking to leverage the `UUIListItemNodeElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIListItemNodeElement } from '@umbraco-ui/uui-list-item-node/lib/uui-list-item-node.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-node@latest/dist/uui-list-item-node.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-node@X.X.X/dist/uui-list-item-node.min.js"></script>
```

## Usage

```html
<uui-list-item-node></uui-list-item-node>
```
