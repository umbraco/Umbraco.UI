# uui-tag

Tag component from Umbraco UI components library.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-tag--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-tag>` via:

```javascript
import '@umbraco-ui/uui/components/tag/tag.js';
```

When looking to leverage the `UUITagElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITagElement } from '@umbraco-ui/uui/components/tag/tag.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-tag look="primary">Tag 1</uui-tag>
<uui-tag look="secondary">Tag 2</uui-tag>
```
