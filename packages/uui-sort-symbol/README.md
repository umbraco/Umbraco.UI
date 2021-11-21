# uui-sort-symbol

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-sort-symbol?logoColor=%231B264F)

Umbraco style sort-symbol component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-sort-symbol
```

Import the registration of `<uui-sort-symbol>` via:

```javascript
import '@umbraco-ui/uui-sort-symbol/lib';
```

When looking to leverage the `UUISortSymbolElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISortSymbolElement } from '@umbraco-ui/uui-sort-symbol/lib/uui-sort-symbol.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-sort-symbol@latest/dist/uui-sort-symbol.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-sort-symbol@X.X.X/dist/uui-sort-symbol.min.js"></script>
```

## Usage

```html
<uui-sort-symbol></uui-sort-symbol>
```
