# uui-toggle

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toggle?logoColor=%231B264F)

Umbraco style toggle component.

## Installation

## ES imports

```zsh
npm i @umbraco-ui/uui-toggle
```

Import the registration of `<uui-toggle>` via:

```javascript
import '@umbraco-ui/uui-toggle/lib';
```

When looking to leverage the `UUIToggleElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIToggleElement } from '@umbraco-ui/uui-toggle/lib/uui-toggle.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-toggle@latest/dist/uui-toggle.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-toggle@X.X.X/dist/uui-toggle.min.js"></script>
```

## Usage

```html
<uui-toggle label="Toggle" value="bike"></uui-toggle>
```
