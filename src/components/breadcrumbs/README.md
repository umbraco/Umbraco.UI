# uui-breadcrumbs

Navigation component displaying a breadcrumb trail with responsive collapse support.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-breadcrumbs--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-breadcrumb-item>` and `<uui-breadcrumbs>` via:

```javascript
import '@umbraco-ui/uui/components/breadcrumbs/breadcrumbs.js';
```

When looking to leverage the `UUIBreadcrumbItemElement` and `UUIBreadcrumbsElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBreadcrumbItemElement, UUIBreadcrumbsElement } from '@umbraco-ui/uui/components/breadcrumbs/breadcrumbs.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-breadcrumbs>
  <uui-breadcrumb-item href="https://...">Item 1</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 2</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 3</uui-breadcrumb-item>
</uui-breadcrumbs>
```
