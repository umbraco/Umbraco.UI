# uui-action-bar

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-action-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-action-bar)

Umbraco style action-bar component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-action-bar--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-action-bar
```

Import the registration of `<uui-action-bar>` via:

```javascript
import '@umbraco-ui/uui-action-bar';
```

When looking to leverage the `UUIActionBarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIActionBarElement } from '@umbraco-ui/uui-action-bar';
```

## Usage

```html
<uui-action-bar>
  <uui-button type="button" look="secondary">Button 1</uui-button>
  <uui-button type="button" look="secondary">Button 2</uui-button>
  <uui-button type="button" look="secondary">Button 3</uui-button>
</uui-action-bar>
```
