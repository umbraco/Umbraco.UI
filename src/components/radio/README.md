# uui-radio

Radio button and radio group components for single-selection form inputs.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-radio--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-radio-group>` and `<uui-radio>` via:

```javascript
import '@umbraco-ui/uui/components/radio/radio.js';
```

When looking to leverage the `UUIRadioGroupElement` and `UUIRadioElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRadioGroupElement, UUIRadioElement } from '@umbraco-ui/uui/components/radio/radio.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
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
