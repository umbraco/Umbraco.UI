# symbol-folder

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-folder?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-folder)

Umbraco style symbol-folder component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-symbol-folder--docs)

## Usage

```zsh
npm i @umbraco-ui/symbol-folder
```

Import the registration of `<symbol-folder>` via:

```javascript
import '@umbraco-ui/symbol-folder';
```

When looking to leverage the `UUIInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputElement } from '@umbraco-ui/symbol-folder';
```

## Example

```html
<symbol-folder
  label="Username"
  type="text"
  placeholder="Enter your username..."></symbol-folder>
<symbol-folder
  label="Password"
  type="password"
  placeholder="Enter your password..."></symbol-folder>
```
