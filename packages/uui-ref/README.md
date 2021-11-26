# uui-ref

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref?logoColor=%231B264F)

Umbraco style ref component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-ref
```

Import the registration of `<uui-ref>` via:

```javascript
import '@umbraco-ui/uui-ref/lib';
```

When looking to leverage the `UUIRefElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefElement } from '@umbraco-ui/uui-ref/lib/uui-ref.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref@latest/dist/uui-ref.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref@X.X.X/dist/uui-ref.min.js"></script>
```

## Usage

```html
<uui-ref></uui-ref>
```
