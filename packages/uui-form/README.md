# uui-form

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-form?logoColor=%231B264F)

Umbraco style form component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-form
```

Import the registration of `<form is="uui-form">` via:

```javascript
import '@umbraco-ui/uui-form/lib';
```

When looking to leverage the `UUIFormElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIFormElement } from '@umbraco-ui/uui-form/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-form@latest/dist/uui-form.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-form@X.X.X/dist/uui-form.min.js"></script>
```

## Usage

```html
<form is="uui-form"></form>
```
