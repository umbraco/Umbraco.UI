# uui-slider

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-slider?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-slider)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-slider--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-slider
```

Import the registration of `<uui-slider>` via:

```javascript
import '@umbraco-ui/uui-slider';
```

When looking to leverage the `UUISliderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISliderElement } from '@umbraco-ui/uui-slider';
```

## Usage

```html
<uui-slider label="Slider" step="10">This slider has 10 steps</uui-slider>
```
