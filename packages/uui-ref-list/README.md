# uui-ref-list

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-list?logoColor=%231B264F)

Umbraco style ref-list component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-ref-list
```

Import the registration of `<uui-ref-list>` via:

```javascript
import '@umbraco-ui/uui-ref-list/define';
```

When looking to leverage the `UUIRefListElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRefListElement } from '@umbraco-ui/uui-ref-list';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref-list@latest/dist/uui-ref-list.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-ref-list@X.X.X/dist/uui-ref-list.min.js"></script>
```

## Usage

```html
<uui-ref-list></uui-ref-list>
```
