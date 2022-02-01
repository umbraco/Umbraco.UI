# uui-scroll-container

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-scroll-container?logoColor=%231B264F)

Umbraco style scroll-container component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-scroll-container
```

Import the registration of `<uui-scroll-container>` via:

```javascript
import '@umbraco-ui/uui-scroll-container';
```

When looking to leverage the `UUIScrollContainerElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIScrollContainerElement } from '@umbraco-ui/uui-scroll-container';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-scroll-container@latest/dist/uui-scroll-container.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-scroll-container@X.X.X/dist/uui-scroll-container.min.js"></script>
```

## Usage

```html
<uui-scroll-container></uui-scroll-container>
```
