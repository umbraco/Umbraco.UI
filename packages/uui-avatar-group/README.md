# uui-avatar-group

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar-group)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-avatar-group
```

Import the registration of `<uui-avatar-group>` via:

```javascript
import '@umbraco-ui/uui-avatar-group/define';
```

When looking to leverage the `UUIAvatarGroupElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIAvatarGroupElement } from '@umbraco-ui/uui-avatar-group';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-avatar-group@latest/dist/uui-avatar-group.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-avatar-group@X.X.X/dist/uui-avatar-group.min.js"></script>
```

## Usage

```html
<uui-avatar-group>
  <uui-avatar title="User 1"></uui-avatar>
  <uui-avatar title="User 2"></uui-avatar>
  <uui-avatar title="User 3"></uui-avatar>
</uui-avatar-group>
```
