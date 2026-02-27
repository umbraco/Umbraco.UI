# uui-color-slider

Umbraco style color-slider component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-color-slider--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-color-slider>` via:

```javascript
import '@umbraco-ui/uui/components/color-slider/color-slider.js';
```

When looking to leverage the `UUIColorSliderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIColorSliderElement } from '@umbraco-ui/uui/components/color-slider/color-slider.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-color-slider></uui-color-slider>
```
