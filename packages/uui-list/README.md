# uui-list

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-list?logoColor=%231B264F)

Umbraco style list component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-list
```

Import the registration of `<uui-list>` via:

```javascript
import '@umbraco-ui/uui-list/lib';
```

When looking to leverage the `UUIListElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIListElement } from '@umbraco-ui/uui-list/lib/uui-list.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list@latest/dist/uui-list.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list@X.X.X/dist/uui-list.min.js"></script>
```

## Usage

```html
<uui-list></uui-list>
```
