# uui-action-bar

Umbraco style action-bar component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-action-bar--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-action-bar>` via:

```javascript
import '@umbraco-ui/uui/components/action-bar/action-bar.js';
```

When looking to leverage the `UUIActionBarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIActionBarElement } from '@umbraco-ui/uui/components/action-bar/action-bar.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-action-bar>
  <uui-button type="button" look="secondary">Button 1</uui-button>
  <uui-button type="button" look="secondary">Button 2</uui-button>
  <uui-button type="button" look="secondary">Button 3</uui-button>
</uui-action-bar>
```
