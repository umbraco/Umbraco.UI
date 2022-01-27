# uui-loader

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-loader
```

Import the registration of `<uui-loader>` via:

```javascript
import '@umbraco-ui/uui-loader/lib';
```

When looking to leverage the `UUILoaderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUILoaderElement } from '@umbraco-ui/uui-loader/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-loader@latest/dist/uui-loader.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-loader@X.X.X/dist/uui-loader.min.js"></script>
```

## Usage

```html
<uui-loader></uui-loader>
```
