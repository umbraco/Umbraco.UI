# uui-table

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-table--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-table-cell>`, `<uui-table-column>`, `<uui-table-head-cell>`, `<uui-table-head>`, `<uui-table-row>` and `<uui-table>` via:

```javascript
import '@umbraco-ui/uui/components/table/table.js';
```

When looking to leverage the `UUITableCellElement`, `UUITableColumnElement`, `UUITableHeadCellElement`, `UUITableHeadElement`, `UUITableRowElement` and `UUITableElement` base class as a type and/or for extension purposes, do so via:

```javascript
import {
  UUITableCellElement,
  UUITableColumnElement,
  UUITableHeadCellElement,
  UUITableHeadElement,
  UUITableRowElement,
  UUITableElement,
} from '@umbraco-ui/uui/components/table/table.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
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
