# uui-avatar-group

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar-group)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-avatar-group--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-avatar-group
```

Import the registration of `<uui-avatar-group>` via:

```javascript
import '@umbraco-ui/uui-avatar-group';
```

When looking to leverage the `UUIAvatarGroupElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIAvatarGroupElement } from '@umbraco-ui/uui-avatar-group';
```

## Usage

```html
<uui-avatar-group>
  <uui-avatar title="User 1"></uui-avatar>
  <uui-avatar title="User 2"></uui-avatar>
  <uui-avatar title="User 3"></uui-avatar>
</uui-avatar-group>
```
