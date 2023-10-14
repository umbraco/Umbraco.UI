# uui-pagination

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-pagination?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-pagination)

Umbraco style pagination component. By implementing a resizeObserver it changes the number of visible buttons to fit the width of the container it sits in. Check this out in the [Storybook](https://uui.umbraco.com/?path=/story/uui-pagination--aaa-overview). Uses `<uui-button></uui-button>` and `<uui-button-group></uui-button-group>`.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-pagination--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-pagination
```

Import the registration of `<uui-pagination>` via:

```javascript
import '@umbraco-ui/uui-pagination';
```

When looking to leverage the `UUIPaginationElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIPaginationElement } from '@umbraco-ui/uui-pagination';
```

## Usage

```html
<uui-pagination total="100"></uui-pagination>
```
