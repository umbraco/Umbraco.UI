# uui-ref

Umbraco style ref component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-ref--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-ref>` via:

```javascript
import '@umbraco-ui/uui/components/ref/ref.js';
```

When looking to leverage the `UUIRefElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefElement } from '@umbraco-ui/uui/components/ref/ref.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```javascript
import { UUIRefElement } from '@umbraco-ui/uui/components/ref/ref.js';

class MyRefElement extends UUIRefElement {}
```
