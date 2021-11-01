# uui-slider

## Installation

### ES imports

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

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-slider@latest/dist/uui-slider.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-slider@X.X.X/dist/uui-slider.min.js"></script>
```

## Usage

```html
<uui-slider label="Slider" step="10">This slider has 10 steps</uui-slider>
```
