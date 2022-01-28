# uui-boolean-input

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-boolean-input?logoColor=%231B264F)

Umbraco style boolean-input component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-boolean-input
```

Import the registration of `<uui-boolean-input>` via:

```javascript
import '@umbraco-ui/uui-boolean-input/define';
```

When looking to leverage the `UUIBooleanInputElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBooleanInputElement } from '@umbraco-ui/uui-boolean-input';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-boolean-input@latest/dist/uui-boolean-input.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-boolean-input@X.X.X/dist/uui-boolean-input.min.js"></script>
```

## Usage

```html
<uui-boolean-input></uui-boolean-input>
```
