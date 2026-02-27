# uui-input-lock

Umbraco style input-lock component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-input-lock--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-input-lock>` via:

```javascript
import '@umbraco-ui/uui/components/input-lock/input-lock.js';
```

When looking to leverage the `UUIInputLockElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputLockElement } from '@umbraco-ui/uui/components/input-lock/input-lock.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-input-lock></uui-input-lock>
```
