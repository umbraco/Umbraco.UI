# uui-input

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-input--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-input
```

Import the registration of `<uui-input>` via:

```javascript
import '@umbraco-ui/uui-input';
```

When looking to leverage the `UUIInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputElement } from '@umbraco-ui/uui-input';
```

## Usage

```html
<uui-input
  label="Username"
  type="text"
  placeholder="Enter your username..."></uui-input>
<uui-input
  label="Password"
  type="password"
  placeholder="Enter your password..."></uui-input>
```
