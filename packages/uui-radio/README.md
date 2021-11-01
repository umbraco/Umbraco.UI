# uui-radio

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-radio
```

Import the registration of `<uui-radio-group>` and `<uui-radio>` via:

```javascript
import '@umbraco-ui/uui-radio/lib';
```

When looking to leverage the `UUIRadioGroupElement` or `UUIRadioElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRadioGroupElement } from '@umbraco-ui/uui-radio/lib/uui-radio-group.element';
import { UUIRadioElement } from '@umbraco-ui/uui-radio/lib/uui-radio.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-radio@latest/dist/uui-radio.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-radio@X.X.X/dist/uui-radio.min.js"></script>
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
