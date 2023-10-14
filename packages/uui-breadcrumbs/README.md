# uui-breadcrumbs

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-breadcrumbs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-breadcrumbs)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-breadcrumbs--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-breadcrumbs
```

Import the registration of `<uui-breadcrumbs>`, `<uui-breadcrumb-item>` via:

```javascript
import '@umbraco-ui/uui-breadcrumbs';
```

When looking to leverage the `UUIBreadcrumbsElement` or `UUIBreadcrumbItemElement` base class as a type and/or for extension purposes, do so via:

```javascript
import {
  UUIBreadcrumbsElement,
  UUIBreadcrumbItemElement,
} from '@umbraco-ui/uui-breadcrumbs';
```

## Usage

```html
<uui-breadcrumbs>
  <uui-breadcrumb-item href="https://...">Item 1</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 2</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 3</uui-breadcrumb-item>
</uui-breadcrumbs>
```
