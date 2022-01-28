# uui-input

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-input
```

Import the registration of `<uui-input>` via:

```javascript
import '@umbraco-ui/uui-input/define';
```

When looking to leverage the `UUIInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIInputElement } from '@umbraco-ui/uui-input';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-input@latest/dist/uui-input.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-input@X.X.X/dist/uui-input.min.js"></script>
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
