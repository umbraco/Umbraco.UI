# uui-checkbox

Checkbox input component with checked, indeterminate, and disabled states.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-checkbox--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-checkbox>` via:

```javascript
import '@umbraco-ui/uui/components/checkbox/checkbox.js';
```

When looking to leverage the `UUICheckboxElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUICheckboxElement } from '@umbraco-ui/uui/components/checkbox/checkbox.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-checkbox label="Checkbox" value="bike"></uui-checkbox>
```
