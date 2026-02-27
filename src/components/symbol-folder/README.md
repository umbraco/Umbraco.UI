# uui-symbol-folder

Umbraco style symbol-folder component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-symbol-folder--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-symbol-folder>` via:

```javascript
import '@umbraco-ui/uui/components/symbol-folder/symbol-folder.js';
```

When looking to leverage the `UUISymbolFolderElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUISymbolFolderElement } from '@umbraco-ui/uui/components/symbol-folder/symbol-folder.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

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
