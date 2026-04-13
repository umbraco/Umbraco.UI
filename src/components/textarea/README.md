# uui-textarea

Umbraco style textarea component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-textarea--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-textarea>` via:

```javascript
import '@umbraco-ui/uui/components/textarea/textarea.js';
```

When looking to leverage the `UUITextareaElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITextareaElement } from '@umbraco-ui/uui/components/textarea/textarea.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-textarea></uui-textarea>
```
