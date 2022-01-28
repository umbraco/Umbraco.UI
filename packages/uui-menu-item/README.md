# uui-menu-item

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-menu-item?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-menu-item)

Umbraco style menu-item component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-menu-item
```

Import the registration of `<uui-menu-item>` via:

```javascript
import '@umbraco-ui/uui-menu-item/define';
```

When looking to leverage the `UUIMenuItemElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIMenuItemElement } from '@umbraco-ui/uui-menu-item';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-menu-item@latest/dist/uui-menu-item.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-menu-item@X.X.X/dist/uui-menu-item.min.js"></script>
```

## Usage

```html
<uui-menu-item></uui-menu-item>
```
