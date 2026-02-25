# uui-tabs

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tabs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tabs)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-tabs--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-tabs
```

Import the registration of `<uui-tab-group>`, `<uui-tab>` via:

```javascript
import '@umbraco-ui/uui-tabs';
```

When looking to leverage the `UUITabGroupElement`, `UUITabElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITabGroupElement, UUITabElement } from '@umbraco-ui/uui-tabs';
```

## Usage

```html
<uui-tab-group>
  <uui-tab>Tab A</uui-tab>
  <uui-tab>Tab B</uui-tab>
  <uui-tab>Tab C</uui-tab>
</uui-tab-group>
```
