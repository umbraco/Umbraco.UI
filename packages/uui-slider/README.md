# uui-slider

## Usage

```zsh
npm i @umbraco-ui/uui-slider
```

Import the registration of `<uui-slider>` via:

```javascript
import '@umbraco-ui/uui-slider/lib';
```

When looking to leverage the `UUISliderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISliderElement } from '@umbraco-ui/uui-slider/lib/uui-slider.element';
```

## Example

```html
  <uui-slider label="Slider" step="10">This slider has 10 steps</uui-slider>
```
