# uui-ref-node-package

Umbraco style ref-node-package component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-ref-node-package--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-ref-node-package>` via:

```javascript
import '@umbraco-ui/uui/components/ref-node-package/ref-node-package.js';
```

When looking to leverage the `UUIRefNodePackageElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefNodePackageElement } from '@umbraco-ui/uui/components/ref-node-package/ref-node-package.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-ref-node-package></uui-ref-node-package>
```
