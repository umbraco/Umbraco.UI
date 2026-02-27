# uui-avatar-group

Container for grouping multiple avatars with an optional limit to show overflow count.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-avatar-group--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-avatar-group>` via:

```javascript
import '@umbraco-ui/uui/components/avatar-group/avatar-group.js';
```

When looking to leverage the `UUIAvatarGroupElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIAvatarGroupElement } from '@umbraco-ui/uui/components/avatar-group/avatar-group.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-avatar-group>
  <uui-avatar title="User 1"></uui-avatar>
  <uui-avatar title="User 2"></uui-avatar>
  <uui-avatar title="User 3"></uui-avatar>
</uui-avatar-group>
```
