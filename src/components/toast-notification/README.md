# uui-toast-notification

Umbraco style toast-notification component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-toast-notification--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-toast-notification>` via:

```javascript
import '@umbraco-ui/uui/components/toast-notification/toast-notification.js';
```

When looking to leverage the `UUIToastNotificationElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIToastNotificationElement } from '@umbraco-ui/uui/components/toast-notification/toast-notification.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-toast-notification></uui-toast-notification>
```
