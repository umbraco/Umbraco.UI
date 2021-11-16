# uui-breadcrumbs

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-breadcrumbs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-breadcrumbs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-breadcrumbs
```

Import the registration of `<uui-breadcrumbs>`, `<uui-breadcrumb-item>` via:

```javascript
import '@umbraco-ui/uui-breadcrumbs/lib';
```

When looking to leverage the `UUIBreadcrumbsElement` or `UUIBreadcrumbItemElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBreadcrumbsElement } from '@umbraco-ui/uui-breadcrumbs/lib/uui-breadcrumbs.element';
import { UUIBreadcrumbItemElement } from '@umbraco-ui/uui-breadcrumbs/lib/uui-breadcrumb-item.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-breadcrumbs@latest/dist/uui-breadcrumbs.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-breadcrumbs@X.X.X/dist/uui-breadcrumbs.min.js"></script>
```

## Usage

```html
<uui-breadcrumbs>
  <uui-breadcrumb-item href="https://...">Item 1</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 2</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 3</uui-breadcrumb-item>
</uui-breadcrumbs>
```
