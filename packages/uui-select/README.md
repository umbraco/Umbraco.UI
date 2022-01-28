# uui-select

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-select?logoColor=%231B264F)

Umbraco style select component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-select
```

Import the registration of `<uui-select>` via:

```javascript
import '@umbraco-ui/uui-select/define';
```

When looking to leverage the `UUISelectElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISelectElement } from '@umbraco-ui/uui-select';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-select@latest/dist/uui-select.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-select@X.X.X/dist/uui-select.min.js"></script>
```

## Usage

```html
<uui-select></uui-select>
```
