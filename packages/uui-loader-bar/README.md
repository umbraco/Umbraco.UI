# uui-loader-bar

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-bar?logoColor=%231B264F)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-loader-bar
```

Import the registration of `<uui-loader-bar>` via:

```javascript
import '@umbraco-ui/uui-loader-bar/lib';
```

When looking to leverage the `UUILoaderBarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUILoaderBarElement } from '@umbraco-ui/uui-loader-bar/lib/uui-loader-bar.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-loader-bar@latest/dist/uui-loader-bar.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-loader-bar@X.X.X/dist/uui-loader-bar.min.js"></script>
```

## Usage

```html
<uui-loader-bar></uui-loader-bar>
```
