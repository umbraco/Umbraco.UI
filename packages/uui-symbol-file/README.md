# uui-symbol-file

### See it in action

Preview the component on [Storybook](http://localhost:6006/?path=/story/uui-symbol-file)

## Usage

```zsh
npm i @umbraco-ui/uui-symbol-file
```

Import the registration of `<uui-symbol-file>` via:

```javascript
import '@umbraco-ui/uui-symbol-file';
```

When looking to leverage the `UUIInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputElement } from '@umbraco-ui/uui-symbol-file';
```

## Example

```html
<uui-symbol-file
  label="Username"
  type="text"
  placeholder="Enter your username..."></uui-symbol-file>
<uui-symbol-file
  label="Password"
  type="password"
  placeholder="Enter your password..."></uui-symbol-file>
```
