# uui-input

## Usage

```zsh
npm i @umbraco-ui/uui-input
```

Import the registration of `<uui-input>` via:

```javascript
import '@umbraco-ui/uui-input/lib';
```

When looking to leverage the `UUIInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputElement } from '@umbraco-ui/uui-input/lib/uui-input.element';
```

## Example

```html
  <uui-input label="Username" type="text" placeholder="Enter your username..."></uui-input>
  <uui-input label="Password" type="password" placeholder="Enter your password..."></uui-input>
```
