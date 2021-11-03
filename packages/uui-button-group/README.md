# uui-button-group

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-group?logoColor=%231B264F)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-button-group
```

Import the registration of `<uui-button-group>` via:

```javascript
import '@umbraco-ui/uui-button-group/lib';
```

When looking to leverage the `UUIButtonGroupElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIButtonGroupElement } from '@umbraco-ui/uui-button-group/lib/uui-button-group.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-button-group@latest/dist/uui-button-group.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-button-group@X.X.X/dist/uui-button-group.min.js"></script>
```

## Usage

```html
<uui-button-group>
  <uui-button look="primary">development</uui-button>
  <uui-button look="secondary">staging</uui-button>
  <uui-button look="success">live</uui-button>
</uui-button-group>
```
