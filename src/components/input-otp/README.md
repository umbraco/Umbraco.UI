# uui-input-otp

One-time-code input. Renders a group of single-character inputs that together make up one value, with keyboard navigation between the characters and paste-splitting of a full code.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-input-otp--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-input-otp>` via:

```javascript
import '@umbraco-ui/uui/components/input-otp/input-otp.js';
```

When looking to leverage the `UUIInputOtpElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputOtpElement } from '@umbraco-ui/uui/components/input-otp/input-otp.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-input-otp label="One-time code"></uui-input-otp>
```

Set `length` to change the number of characters, `integer-only` to accept digits only and `masked` to hide the entered characters:

```html
<uui-input-otp
  label="One-time code"
  length="4"
  integer-only
  masked></uui-input-otp>
```

To let the browser autofill a code from an SMS or a passkey, set the `autocomplete` attribute:

```html
<uui-input-otp
  label="One-time code"
  autocomplete="one-time-code"></uui-input-otp>
```
