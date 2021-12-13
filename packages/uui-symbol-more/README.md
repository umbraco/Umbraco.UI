# uui-symbol-more

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-more?logoColor=%231B264F)

Umbraco style symbol-more component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-symbol-more
```

Import the registration of `<uui-symbol-more>` via:

```javascript
import '@umbraco-ui/uui-symbol-more/lib';
```

When looking to leverage the `UUISymbolMoreElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISymbolMoreElement } from '@umbraco-ui/uui-symbol-more/lib/uui-symbol-more.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-symbol-more@latest/dist/uui-symbol-more.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-symbol-more@X.X.X/dist/uui-symbol-more.min.js"></script>
```

## Usage

```html
<uui-symbol-more></uui-symbol-more>
```
