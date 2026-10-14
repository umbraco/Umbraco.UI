# uui-slider

Range input component with customizable min, max, steps, and optional value label.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-slider--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-slider>` via:

```javascript
import '@umbraco-ui/uui/components/slider/slider.js';
```

When looking to leverage the `UUISliderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISliderElement } from '@umbraco-ui/uui/components/slider/slider.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-slider label="Slider" step="10">This slider has 10 steps</uui-slider>
```

The selected value is visible by default. Set `hide-value-label` to hide it.

When step values are not hidden, only the minimum and maximum are shown if
steps are too closely spaced or there are more than 20 intervals.
With `hide-step-values`, minimum and maximum labels appear only on hover or
keyboard focus; intermediate step labels stay hidden.
