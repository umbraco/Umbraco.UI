# uui-avatar

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-avatar--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-avatar>` via:

```javascript
import '@umbraco-ui/uui/components/avatar/avatar.js';
```

When looking to leverage the `UUIAvatarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIAvatarElement } from '@umbraco-ui/uui/components/avatar/avatar.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-avatar title="First Last"></uui-avatar>
<uui-avatar img-src="..."></uui-avatar>
```
