# uui-icon

Icon component that renders SVG icons from a `<uui-icon-registry>`.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-icon--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-icon>` via:

```javascript
import '@umbraco-ui/uui/components/icon/uui-icon.element.js';
```

When looking to leverage the `UUIIconElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIIconElement } from '@umbraco-ui/uui/components/icon/uui-icon.element.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-icon-registry-essential>
  <uui-icon name="favorite"></uui-icon>
</uui-icon-registry-essential>
```
