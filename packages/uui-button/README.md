# uui-button

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-button
```

Import the registration of `<uui-button>` via:

```javascript
import '@umbraco-ui/uui-button/define';
```

When looking to leverage the `UUIButtonElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIButtonElement } from '@umbraco-ui/uui-button';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-button@latest/dist/uui-button.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-button@X.X.X/dist/uui-button.min.js"></script>
```

## Usage

```html
<uui-button label="Basic Button" look="primary">Basic button</uui-button>
```
