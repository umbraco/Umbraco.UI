# uui-button

All-around button component for the Umbraco backoffice.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-button--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-button>` via:

```javascript
import '@umbraco-ui/uui/components/button/button.js';
```

When looking to leverage the `UUIButtonElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIButtonElement } from '@umbraco-ui/uui/components/button/button.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-button label="Basic Button" look="primary">Basic button</uui-button>
```
