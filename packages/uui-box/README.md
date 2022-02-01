# uui-box

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-box?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-box)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-box
```

Import the registration of `<uui-box>` via:

```javascript
import '@umbraco-ui/uui-box';
```

When looking to leverage the `UUIBoxElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBoxElement } from '@umbraco-ui/uui-box';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-box@latest/dist/uui-box.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-box@X.X.X/dist/uui-box.min.js"></script>
```

## Usage

```html
<uui-box>
  <div slot="header">Header</div>
  <div slot="main">Main</main>
</uui-box>
```
