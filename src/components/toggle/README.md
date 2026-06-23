# uui-toggle

Umbraco style toggle component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-toggle--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-toggle>` via:

```javascript
import '@umbraco-ui/uui/components/toggle/toggle.js';
```

When looking to leverage the `UUIToggleElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIToggleElement } from '@umbraco-ui/uui/components/toggle/toggle.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-toggle label="Toggle" value="bike"></uui-toggle>
```
