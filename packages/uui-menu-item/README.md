# uui-menu-item

## Usage

```zsh
npm i @umbraco-ui/uui-menu-item
```

Import the registration of `<uui-menu-item>` via:

```javascript
import '@umbraco-ui/uui-menu-item/lib';
```

When looking to leverage the `UUIMenuItemElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIMenuItemElement } from '@umbraco-ui/uui-menu-item/lib/uui-menu-item.element';
```

## Example

```html
<uui-menu-item has-children label="Content">
  <uui-menu-item label="Templates"></uui-menu-item>
</uui-menu-item>
```
