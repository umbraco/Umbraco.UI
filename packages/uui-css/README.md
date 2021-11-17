# uui-css

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-css?logoColor=%231B264F)

Umbraco style css component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-css
```

Import the registration of `<uui-css>` via:

```javascript
import '@umbraco-ui/uui-css/lib';
```

When looking to leverage the `UUICssElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUICssElement } from '@umbraco-ui/uui-css/lib/uui-css.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-css@latest/dist/uui-css.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-css@X.X.X/dist/uui-css.min.js"></script>
```

## Usage

```html
<uui-css></uui-css>
```
