# uui-input-password

Password input component that extends `<uui-input>` with a toggle button to show/hide the password.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-input-password--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-input-password>` via:

```javascript
import '@umbraco-ui/uui/components/input-password/uui-input-password.element.js';
```

When looking to leverage the `UUIInputPasswordElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputPasswordElement } from '@umbraco-ui/uui/components/input-password/uui-input-password.element.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-input-password label="Password"></uui-input-password>
```
