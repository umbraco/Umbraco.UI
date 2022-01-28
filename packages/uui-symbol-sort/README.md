# uui-symbol-sort

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-sort?logoColor=%231B264F)

Umbraco style sort-symbol component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-symbol-sort
```

Import the registration of `<uui-symbol-sort>` via:

```javascript
import '@umbraco-ui/uui-symbol-sort/define';
```

When looking to leverage the `UUISymbolSortElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISymbolSortElement } from '@umbraco-ui/uui-symbol-sort';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-symbol-sort@latest/dist/uui-symbol-sort.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-symbol-sort@X.X.X/dist/uui-symbol-sort.min.js"></script>
```

## Usage

```html
<uui-symbol-sort></uui-symbol-sort>
```
