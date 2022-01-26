# uui-color-picker-slider

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-picker-slider?logoColor=%231B264F)

Umbraco style color-picker-slider component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-color-picker-slider
```

Import the registration of `<uui-color-picker-slider>` via:

```javascript
import '@umbraco-ui/uui-color-picker-slider/lib';
```

When looking to leverage the `UUIColorPickerSliderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIColorPickerSliderElement } from '@umbraco-ui/uui-color-picker-slider/lib/uui-color-picker-slider.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-color-picker-slider@latest/dist/uui-color-picker-slider.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-color-picker-slider@X.X.X/dist/uui-color-picker-slider.min.js"></script>
```

## Usage

```html
<uui-color-picker-slider></uui-color-picker-slider>
```
