# uui-pagination

Umbraco style pagination component. By implementing a resizeObserver it changes the number of visible buttons to fit the width of the container it sits in. Check this out in the [Storybook](https://uui.umbraco.com/?path=/story/uui-pagination--aaa-overview). Uses `<uui-button></uui-button>` and `<uui-button-group></uui-button-group>`.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-pagination--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-pagination>` via:

```javascript
import '@umbraco-ui/uui/components/pagination/pagination.js';
```

When looking to leverage the `UUIPaginationElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIPaginationElement } from '@umbraco-ui/uui/components/pagination/pagination.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-pagination total="100"></uui-pagination>
```
