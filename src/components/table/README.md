# uui-table

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-table?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-table)

### See it in action

Preview the component on [Storybook](hhttps://uui.umbraco.com/?path=/docs/uui-table--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-table
```

Import the registration of `<uui-table>`, `<uui-table-row>`, `<uui-table-cell>`, `<uui-table-head>`, `<uui-table-head-cell>`, `<uui-table-column>` via:

```javascript
import '@umbraco-ui/uui-table';
```

When looking to leverage the `UUITableElement`, `UUITableRowElement`, `UUITableCellElement`, `UUITableHeadElement`, `UUITableHeadCellElement`, `UUITableColumnElement` base class as a type and/or for extension purposes, do so via:

```javascript
import {
  UUITableElement,
  UUITableRowElement,
  UUITableCellElement,
  UUITableHeadElement,
  UUITableHeadCellElement,
  UUITableColumnElement,
} from '@umbraco-ui/uui-table';
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
