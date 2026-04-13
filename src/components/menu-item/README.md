# uui-menu-item

Umbraco style menu-item component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-menu-item--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-menu-item>` via:

```javascript
import '@umbraco-ui/uui/components/menu-item/menu-item.js';
```

When looking to leverage the `UUIMenuItemElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIMenuItemElement } from '@umbraco-ui/uui/components/menu-item/menu-item.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-menu-item></uui-menu-item>
```
