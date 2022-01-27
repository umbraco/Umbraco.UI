import { UUITableRowElement } from './uui-table-row.element';
import { UUITableCellElement } from './uui-table-cell.element';
import { UUITableHeadCellElement } from './uui-table-head-cell.element';
import { UUITableHeadElement } from './uui-table-head.element';
import { UUITableColumnElement } from './uui-table-column.element';
import { UUITableElement } from './uui-table.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

defineElement('uui-table-column', UUITableColumnElement);
defineElement('uui-table-head-cell', UUITableHeadCellElement);
defineElement('uui-table-head', UUITableHeadElement);
defineElement('uui-table-cell', UUITableCellElement);
defineElement('uui-table-row', UUITableRowElement);
defineElement('uui-table', UUITableElement);

export * from './uui-table.element';
export * from './uui-table-cell.element';
export * from './uui-table-column.element';
export * from './uui-table-head-cell.element';
export * from './uui-table-head.element';
export * from './uui-table-row.element';
