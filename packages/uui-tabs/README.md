# uui-tabs

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tabs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tabs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-tabs
```

Import the registration of `<uui-tab-group>`, `<uui-tab>` via:

```javascript
import '@umbraco-ui/uui-tabs';
```

When looking to leverage the `UUITabGroupElement`, `UUITabElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITabGroupElement, UUITabElement } from '@umbraco-ui/uui-tabs';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-tabs@latest/dist/uui-tabs.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-tabs@X.X.X/dist/uui-tabs.min.js"></script>
```

## Usage

```html
<uui-tab-group>
  <uui-tab>Tab A</uui-tab>
  <uui-tab>Tab B</uui-tab>
  <uui-tab>Tab C</uui-tab>
</uui-tab-group>
```
