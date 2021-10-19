# uui-table

## Usage

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

## Example

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
