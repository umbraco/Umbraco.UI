# uui-ref-node

Umbraco style ref-node component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-ref-node--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-ref-node>` via:

```javascript
import '@umbraco-ui/uui/components/ref-node/ref-node.js';
```

When looking to leverage the `UUIRefNodeElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefNodeElement } from '@umbraco-ui/uui/components/ref-node/ref-node.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-ref-node></uui-ref-node>
```
