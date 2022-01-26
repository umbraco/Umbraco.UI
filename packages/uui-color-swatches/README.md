# uui-color-swatches

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-swatches?logoColor=%231B264F)

Umbraco style color-swatches component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-color-swatches
```

Import the registration of `<uui-color-swatches>` via:

```javascript
import '@umbraco-ui/uui-color-swatches/lib';
```

When looking to leverage the `UUIColorSwatchesElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIColorSwatchesElement } from '@umbraco-ui/uui-color-swatches/lib/uui-color-swatches.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-color-swatches@latest/dist/uui-color-swatches.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-color-swatches@X.X.X/dist/uui-color-swatches.min.js"></script>
```

## Usage

```html
<uui-color-swatches></uui-color-swatches>
```
