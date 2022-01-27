# uui-textarea

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-textarea?logoColor=%231B264F)

Umbraco style textarea component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-textarea
```

Import the registration of `<uui-textarea>` via:

```javascript
import '@umbraco-ui/uui-textarea/lib';
```

When looking to leverage the `UUITextareaElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITextareaElement } from '@umbraco-ui/uui-textarea/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-textarea@latest/dist/uui-textarea.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-textarea@X.X.X/dist/uui-textarea.min.js"></script>
```

## Usage

```html
<uui-textarea></uui-textarea>
```
