# symbol-folder

## Usage

```zsh
npm i @umbraco-ui/symbol-folder
```

Import the registration of `<symbol-folder>` via:

```javascript
import '@umbraco-ui/symbol-folder/lib';
```

When looking to leverage the `UUIInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputElement } from '@umbraco-ui/symbol-folder/lib';
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
