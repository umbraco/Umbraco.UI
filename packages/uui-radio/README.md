# uui-radio

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-radio?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-radio)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-radio--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-radio
```

Import the registration of `<uui-radio-group>` and `<uui-radio>` via:

```javascript
import '@umbraco-ui/uui-radio';
```

When looking to leverage the `UUIRadioGroupElement` or `UUIRadioElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRadioGroupElement } from '@umbraco-ui/uui-radio';
import { UUIRadioElement } from '@umbraco-ui/uui-radio';
```

## Usage

```html
<uui-radio-group name="Options">
  <uui-radio value="1">Option 1</uui-radio>
  <uui-radio value="2">Option 2</uui-radio>
  <uui-radio value="3">Option 3</uui-radio>
  <uui-radio value="4">Option 4</uui-radio>
</uui-radio-group>
```
