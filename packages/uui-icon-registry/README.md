# uui-icon-registry

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon-registry?logoColor=%231B264F)

Umbraco style icon-registry component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-icon-registry
```

Import the registration of `<uui-icon-registry>` via:

```javascript
import '@umbraco-ui/uui-icon-registry/lib';
```

When looking to leverage the `UUIIconRegistryElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIIconRegistryElement } from '@umbraco-ui/uui-icon-registry/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-icon-registry@latest/dist/uui-icon-registry.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-icon-registry@X.X.X/dist/uui-icon-registry.min.js"></script>
```

## Usage

```html
<uui-icon-registry></uui-icon-registry>
```
