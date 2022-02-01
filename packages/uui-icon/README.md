# uui-icon

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon?logoColor=%231B264F)

Umbraco style icon component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-icon
```

Import the registration of `<uui-icon>` via:

```javascript
import '@umbraco-ui/uui-icon';
```

When looking to leverage the `UUIIconElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIIconElement } from '@umbraco-ui/uui-icon';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-icon@latest/dist/uui-icon.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-icon@X.X.X/dist/uui-icon.min.js"></script>
```

## Usage

```html
<uui-icon></uui-icon>
```
