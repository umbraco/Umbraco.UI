# uui-form

Umbraco style form component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-form--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-form>` via:

```javascript
import '@umbraco-ui/uui/components/form/form.js';
```

When looking to leverage the `UUIFormElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIFormElement } from '@umbraco-ui/uui/components/form/form.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-form>
  <form>...</form>
</uui-form>
```
