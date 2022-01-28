# uui-badge

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-badge?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-badge)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-badge
```

Import the registration of `<uui-badge>` via:

```javascript
import '@umbraco-ui/uui-badge/define';
```

When looking to leverage the `UUIBadgeElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBadgeElement } from '@umbraco-ui/uui-badge';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-badge@latest/dist/uui-badge.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-badge@X.X.X/dist/uui-badge.min.js"></script>
```

## Usage

```html
<uui-badge look="danger">!</uui-badge>
```
