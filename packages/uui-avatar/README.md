# uui-avatar

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-avatar
```

Import the registration of `<uui-avatar>` via:

```javascript
import '@umbraco-ui/uui-avatar/define';
```

When looking to leverage the `UUIAvatarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIAvatarElement } from '@umbraco-ui/uui-avatar';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-avatar@latest/dist/uui-avatar.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-avatar@X.X.X/dist/uui-avatar.min.js"></script>
```

## Usage

```html
<uui-avatar title="First Last"></uui-avatar>
<uui-avatar img-src="..."></uui-avatar>
```
