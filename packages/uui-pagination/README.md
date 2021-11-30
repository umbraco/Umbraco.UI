# uui-pagination

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-pagination?logoColor=%231B264F)

Umbraco style pagination component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-pagination
```

Import the registration of `<uui-pagination>` via:

```javascript
import '@umbraco-ui/uui-pagination/lib';
```

When looking to leverage the `UUIPaginationElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIPaginationElement } from '@umbraco-ui/uui-pagination/lib/uui-pagination.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-pagination@latest/dist/uui-pagination.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-pagination@X.X.X/dist/uui-pagination.min.js"></script>
```

## Usage

```html
<uui-pagination></uui-pagination>
```
