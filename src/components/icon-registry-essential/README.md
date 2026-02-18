# uui-icon-registry-essential

A pre-built icon registry containing essential icons used throughout the Umbraco backoffice (check, add, delete, etc.).

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-icon-registry-essential--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-icon-registry-essential>` via:

```javascript
import '@umbraco-ui/uui/components/icon-registry-essential/uui-icon-registry-essential.element.js';
```

When looking to leverage the `UUIIconRegistryEssentialElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIIconRegistryEssentialElement } from '@umbraco-ui/uui/components/icon-registry-essential/uui-icon-registry-essential.element.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

Wrap your application (or a section of it) with `<uui-icon-registry-essential>` to make the essential icons available:

```html
<uui-icon-registry-essential>
  <uui-icon name="check"></uui-icon>
  <uui-icon name="delete"></uui-icon>
</uui-icon-registry-essential>
```
