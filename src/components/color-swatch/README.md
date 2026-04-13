# uui-color-swatch

Umbraco style color-swatch component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-color-swatch--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-color-swatch>` via:

```javascript
import '@umbraco-ui/uui/components/color-swatch/color-swatch.js';
```

When looking to leverage the `UUIColorSwatchElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIColorSwatchElement } from '@umbraco-ui/uui/components/color-swatch/color-swatch.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-color-swatch></uui-color-swatch>
```
