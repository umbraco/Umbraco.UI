# uui-tabs

Tab group and tab components for organizing content into switchable panels.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-tabs--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-tab-group>` and `<uui-tab>` via:

```javascript
import '@umbraco-ui/uui/components/tabs/tabs.js';
```

When looking to leverage the `UUITabGroupElement` and `UUITabElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITabGroupElement, UUITabElement } from '@umbraco-ui/uui/components/tabs/tabs.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-tab-group>
  <uui-tab>Tab A</uui-tab>
  <uui-tab>Tab B</uui-tab>
  <uui-tab>Tab C</uui-tab>
</uui-tab-group>
```
