# uui-list-item

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-list-item?logoColor=%231B264F)

Umbraco style list-item component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-list-item
```

Import the registration of `<uui-list-item>` via:

```javascript
import '@umbraco-ui/uui-list-item/lib';
```

When looking to leverage the `UUIListItemElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIListItemElement } from '@umbraco-ui/uui-list-item/lib/uui-list-item.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item@latest/dist/uui-list-item.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item@X.X.X/dist/uui-list-item.min.js"></script>
```

## Usage

```html
<uui-list-item></uui-list-item>
```
