# uui-symbol-lock

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-lock?logoColor=%231B264F)

Umbraco style symbol-lock component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-symbol-lock
```

Import the registration of `<uui-symbol-lock>` via:

```javascript
import '@umbraco-ui/uui-symbol-lock/lib';
```

When looking to leverage the `UUISymbolLockElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISymbolLockElement } from '@umbraco-ui/uui-symbol-lock/lib/uui-symbol-lock.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-symbol-lock@latest/dist/uui-symbol-lock.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-symbol-lock@X.X.X/dist/uui-symbol-lock.min.js"></script>
```

## Usage

```html
<uui-symbol-lock></uui-symbol-lock>
```
