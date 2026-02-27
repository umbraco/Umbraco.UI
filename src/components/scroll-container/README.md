# uui-scroll-container

Umbraco style scroll-container component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-scroll-container--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-scroll-container>` via:

```javascript
import '@umbraco-ui/uui/components/scroll-container/scroll-container.js';
```

When looking to leverage the `UUIScrollContainerElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIScrollContainerElement } from '@umbraco-ui/uui/components/scroll-container/scroll-container.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-scroll-container></uui-scroll-container>
```
