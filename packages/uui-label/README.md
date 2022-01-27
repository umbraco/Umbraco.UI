# uui-label

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-label?logoColor=%231B264F)

Umbraco style label component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-label
```

Import the registration of `<uui-label>` via:

```javascript
import '@umbraco-ui/uui-label/lib';
```

When looking to leverage the `UUILabelElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUILabelElement } from '@umbraco-ui/uui-label/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-label@latest/dist/uui-label.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-label@X.X.X/dist/uui-label.min.js"></script>
```

## Usage

```html
<uui-label></uui-label>
```
