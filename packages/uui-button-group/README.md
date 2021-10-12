# uui-button-group

## Usage

```zsh
npm i @umbraco-ui/uui-button-group
```

Import the registration of `<uui-button-group>` via:

```javascript
import '@umbraco-ui/uui-button-group/lib';
```

When looking to leverage the `UUIButtonGroupElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIButtonGroupElement } from '@umbraco-ui/uui-button-group/lib/uui-button-group.element';
```

## Example

```html
<uui-button-group>
  <uui-button look="primary">development</uui-button>
  <uui-button look="secondary">staging</uui-button>
  <uui-button look="success">live</uui-button>
</uui-button-group>
```
