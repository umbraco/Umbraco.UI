# uui-checkbox

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-checkbox?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-checkbox)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-checkbox
```

Import the registration of `<uui-checkbox>` via:

```javascript
import '@umbraco-ui/uui-checkbox/lib';
```

When looking to leverage the `UUICheckboxElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUICheckboxElement } from '@umbraco-ui/uui-checkbox/lib/uui-checkbox.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-checkbox@latest/dist/uui-checkbox.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-checkbox@X.X.X/dist/uui-checkbox.min.js"></script>
```

## Usage

```html
<uui-checkbox label="Checkbox" value="bike"></uui-checkbox>
```
