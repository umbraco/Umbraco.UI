# uui-input

Text input component with support for various input types, prepend/append slots, and form validation.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-input--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-input>` via:

```javascript
import '@umbraco-ui/uui/components/input/uui-input.element.js';
```

When looking to leverage the `UUIInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputElement } from '@umbraco-ui/uui/components/input/uui-input.element.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-input
  label="Username"
  type="text"
  placeholder="Enter your username..."></uui-input>
```
