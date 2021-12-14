# uui-table

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-table?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-table)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-table
```

Import the registration of `<uui-table>`, `<uui-table-row>`, `<uui-table-cell>`, `<uui-table-head>`, `<uui-table-head-cell>`, `<uui-table-column>` via:

```javascript
import '@umbraco-ui/uui-table/lib';
```

When looking to leverage the `UUITableElement`, `UUITableRowElement`, `UUITableCellElement`, `UUITableHeadElement`, `UUITableHeadCellElement`, `UUITableColumnElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITableElement } from '@umbraco-ui/uui-table/lib/uui-table.element';
import { UUITableRowElement } from '@umbraco-ui/uui-table/lib/uui-table-row.element';
import { UUITableCellElement } from '@umbraco-ui/uui-table/lib/uui-table-cell.element';
import { UUITableHeadElement } from '@umbraco-ui/uui-table/lib/uui-table-head.element';
import { UUITableHeadCellElement } from '@umbraco-ui/uui-table/lib/uui-table-head-cell.element';
import { UUITableColumnElement } from '@umbraco-ui/uui-table/lib/uui-table-column.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-table@latest/dist/uui-table.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-table@X.X.X/dist/uui-table.min.js"></script>
```

## Usage

```html
<uui-table>
  <uui-table-head>
    <uui-table-head-cell>Title 1</uui-table-head-cell>
    <uui-table-head-cell>Title 2</uui-table-head-cell>
  </uui-table-head>
  <uui-table-row>
    <uui-table-cell>Cell 1</uui-table-cell>
    <uui-table-cell>Cell 2</uui-table-cell>
  </uui-table-row>
  <uui-table-row>
    <uui-table-cell>Cell 3</uui-table-cell>
    <uui-table-cell>Cell 4</uui-table-cell>
  </uui-table-row>
</uui-table>
```

### With styled columns

```html
<uui-table aria-label="Example table" aria-describedby="#some-element-id">
  <!-- Apply styles to the uui-table-column to style the columns. You must have the same number of this elements as you have columns -->
  <uui-table-column
    style="width: 20%; background-color: green"></uui-table-column>
  <uui-table-column
    style="width: 80%; background-color: red"></uui-table-column>

  <uui-table-head>
    <uui-table-head-cell>Title 1</uui-table-head-cell>
    <uui-table-head-cell>Title 2</uui-table-head-cell>
  </uui-table-head>

  <uui-table-row>
    <uui-table-cell>Cell 1</uui-table-cell>
    <uui-table-cell>Cell 2</uui-table-cell>
  </uui-table-row>

  <uui-table-row>
    <uui-table-cell>Cell 3</uui-table-cell>
    <uui-table-cell>Cell 4</uui-table-cell>
  </uui-table-row>
</uui-table>
```
