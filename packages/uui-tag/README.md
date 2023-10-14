# uui-tag

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tag?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tag)

Tag component from Umbraco UI components library.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-tag--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-tag
```

Import the registration of `<uui-tag>` via:

```javascript
import '@umbraco-ui/uui-tag';
```

When looking to leverage the `UUITagElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITagElement } from '@umbraco-ui/uui-tag';
```

## Usage

```html
<uui-tag look="primary">Tag 1</uui-tag>
<uui-tag look="secondary">Tag 2</uui-tag>
```
