# uui-ref-list

Umbraco style ref-list component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-ref-list--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-ref-list>` via:

```javascript
import '@umbraco-ui/uui/components/ref-list/ref-list.js';
```

When looking to leverage the `UUIRefListElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefListElement } from '@umbraco-ui/uui/components/ref-list/ref-list.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-ref-list></uui-ref-list>
```
