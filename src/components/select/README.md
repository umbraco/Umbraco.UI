# uui-select

Umbraco style select component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-select--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-select>` via:

```javascript
import '@umbraco-ui/uui/components/select/select.js';
```

When looking to leverage the `UUISelectElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISelectElement } from '@umbraco-ui/uui/components/select/select.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-select></uui-select>
```
