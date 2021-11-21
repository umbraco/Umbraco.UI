# uui-expand-symbol

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-expand-symbol?logoColor=%231B264F)

Umbraco style expand-symbol component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-expand-symbol
```

Import the registration of `<uui-expand-symbol>` via:

```javascript
import '@umbraco-ui/uui-expand-symbol/lib';
```

When looking to leverage the `UUIExpandSymbolElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIExpandSymbolElement } from '@umbraco-ui/uui-expand-symbol/lib/uui-expand-symbol.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-expand-symbol@latest/dist/uui-expand-symbol.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-expand-symbol@X.X.X/dist/uui-expand-symbol.min.js"></script>
```

## Usage

```html
<uui-expand-symbol></uui-expand-symbol>
```
