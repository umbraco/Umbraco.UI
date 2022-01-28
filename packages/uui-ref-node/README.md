# uui-ref-node

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node?logoColor=%231B264F)

Umbraco style ref-node component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-ref-node
```

Import the registration of `<uui-ref-node>` via:

```javascript
import '@umbraco-ui/uui-ref-node/define';
```

When looking to leverage the `UUIRefNodeElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefNodeElement } from '@umbraco-ui/uui-ref-node';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref-node@latest/dist/uui-ref-node.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref-node@X.X.X/dist/uui-ref-node.min.js"></script>
```

## Usage

```html
<uui-ref-node></uui-ref-node>
```
