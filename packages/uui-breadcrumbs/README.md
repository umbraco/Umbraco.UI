# uui-breadcrumbs

## Usage

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

## Example

```html
<uui-breadcrumbs>
  <uui-breadcrumb-item href="https://...">Item 1</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 2</uui-breadcrumb-item>
  <uui-breadcrumb-item href="https://...">Item 3</uui-breadcrumb-item>
</uui-breadcrumbs>
```
