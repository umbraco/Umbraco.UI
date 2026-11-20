# uui-form-validation-message

Umbraco style form-validation-message component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-form-validation-message--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-form-validation-message>` via:

```javascript
import '@umbraco-ui/uui/components/form-validation-message/form-validation-message.js';
```

When looking to leverage the `UUIFormValidationMessageElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIFormValidationMessageElement } from '@umbraco-ui/uui/components/form-validation-message/form-validation-message.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-form-validation-message></uui-form-validation-message>
```

## Messages are rendered as HTML

Validation messages are rendered as HTML, so they can carry formatting such as `<strong>`. If a message you provide includes content you don't control, sanitise it before handing it to the form control, for example with [DOMPurify](https://github.com/cure53/DOMPurify). This applies to `requiredMessage`, `errorMessage`, `setCustomValidity()` and the messages of custom validators.

Messages for native constraints, such as `type="email"` or `pattern` on `uui-input`, are written by the browser and can quote the field's value. If that value isn't trusted, render those messages yourself instead of using this element: listen for the `invalid` and `valid` events and read the control's `validationMessage`.
