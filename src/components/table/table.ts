import { defineElement } from '../../internal/registration/index.js';
import { UUITableCellElement } from './table-cell.element.js';
import { UUITableColumnElement } from './table-column.element.js';
import { UUITableHeadCellElement } from './table-head-cell.element.js';
import { UUITableHeadElement } from './table-head.element.js';
import { UUITableRowElement } from './table-row.element.js';
import { UUITableElement } from './table.element.js';

export * from './table-cell.element.js';
export * from './table-column.element.js';
export * from './table-head-cell.element.js';
export * from './table-head.element.js';
export * from './table-row.element.js';
export * from './table.element.js';

export default UUITableElement;

defineElement('uui-table-cell', UUITableCellElement);
defineElement('uui-table-column', UUITableColumnElement);
defineElement('uui-table-head-cell', UUITableHeadCellElement);
defineElement('uui-table-head', UUITableHeadElement);
defineElement('uui-table-row', UUITableRowElement);
defineElement('uui-table', UUITableElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-cell': UUITableCellElement;
    'uui-table-column': UUITableColumnElement;
    'uui-table-head-cell': UUITableHeadCellElement;
    'uui-table-head': UUITableHeadElement;
    'uui-table-row': UUITableRowElement;
    'uui-table': UUITableElement;
  }
}
