# uui-input-password

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input-password?logoColor=%231B264F)

Umbraco style input-password component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-input-password
```

Import the registration of `<uui-input-password>` via:

```javascript
import '@umbraco-ui/uui-input-password/lib';
```

When looking to leverage the `UUIInputPasswordElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputPasswordElement } from '@umbraco-ui/uui-input-password/lib/uui-input-password.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-input-password@latest/dist/uui-input-password.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-input-password@X.X.X/dist/uui-input-password.min.js"></script>
```

## Usage

```html
<uui-input-password></uui-input-password>
```
