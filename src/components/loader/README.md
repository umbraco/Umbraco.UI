# uui-loader

Animated loader with three pulsing dots.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-loader--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-loader>` via:

```javascript
import '@umbraco-ui/uui/components/loader/loader.js';
```

When looking to leverage the `UUILoaderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUILoaderElement } from '@umbraco-ui/uui/components/loader/loader.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-loader></uui-loader>
```
