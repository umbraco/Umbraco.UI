# uui-button-group

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button-group)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-button-group--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-button-group
```

Import the registration of `<uui-button-group>` via:

```javascript
import '@umbraco-ui/uui-button-group';
```

When looking to leverage the `UUIButtonGroupElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIButtonGroupElement } from '@umbraco-ui/uui-button-group';
```

## Usage

```html
<uui-button-group>
  <uui-button look="primary">development</uui-button>
  <uui-button look="secondary">staging</uui-button>
  <uui-button look="success">live</uui-button>
</uui-button-group>
```
