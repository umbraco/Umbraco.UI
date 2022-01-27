# uui-loader-circle

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-circle?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader-circle)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-loader-circle
```

Import the registration of `<uui-loader-circle>` via:

```javascript
import '@umbraco-ui/uui-loader-circle/lib';
```

When looking to leverage the `UUILoaderCircleElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUILoaderCircleElement } from '@umbraco-ui/uui-loader-circle/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-loader-circle@latest/dist/uui-loader-circle.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-loader-circle@X.X.X/dist/uui-loader-circle.min.js"></script>
```

## Usage

```html
<uui-loader-circle></uui-loader-circle>
```
