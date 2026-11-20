# uui-range-slider

Umbraco style range-slider component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-range-slider--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-range-slider>` via:

```javascript
import '@umbraco-ui/uui/components/range-slider/range-slider.js';
```

When looking to leverage the `UUIRangeSliderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRangeSliderElement } from '@umbraco-ui/uui/components/range-slider/range-slider.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-range-slider></uui-range-slider>
```

Selected values are visible by default. When their labels would overlap, they
combine into one label above the handles, for example `20.1 - 20.2`.

Set `hide-value-label` to hide the selected values.

When step values are not hidden, only the minimum and maximum are shown if
steps are too closely spaced or there are more than 20 intervals.
With `hide-step-values`, minimum and maximum labels appear only on hover or
keyboard focus; intermediate step labels stay hidden.
