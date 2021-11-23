# uui-list-item-form

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-list-item-form?logoColor=%231B264F)

Umbraco style list-item-form component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-list-item-form
```

Import the registration of `<uui-list-item-form>` via:

```javascript
import '@umbraco-ui/uui-list-item-form/lib';
```

When looking to leverage the `UUIListItemFormElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIListItemFormElement } from '@umbraco-ui/uui-list-item-form/lib/uui-list-item-form.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-form@latest/dist/uui-list-item-form.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-form@X.X.X/dist/uui-list-item-form.min.js"></script>
```

## Usage

```html
<uui-list-item-form></uui-list-item-form>
```
