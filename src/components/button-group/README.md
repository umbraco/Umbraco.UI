# uui-button-group

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-button-group--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-button-group>` via:

```javascript
import '@umbraco-ui/uui/components/button-group/button-group.js';
```

When looking to leverage the `UUIButtonGroupElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIButtonGroupElement } from '@umbraco-ui/uui/components/button-group/button-group.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-button-group>
  <uui-button look="primary">development</uui-button>
  <uui-button look="secondary">staging</uui-button>
  <uui-button look="success">live</uui-button>
</uui-button-group>
```
