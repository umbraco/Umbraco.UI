import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUITableCellElement } from './uui-table-cell.element';
import { UUITableColumnElement } from './uui-table-column.element';
import { UUITableHeadCellElement } from './uui-table-head-cell.element';
import { UUITableHeadElement } from './uui-table-head.element';
import { UUITableRowElement } from './uui-table-row.element';
import { UUITableElement } from './uui-table.element';

defineElement('uui-table-column', UUITableColumnElement);
defineElement('uui-table-head-cell', UUITableHeadCellElement);
defineElement('uui-table-head', UUITableHeadElement);
defineElement('uui-table-cell', UUITableCellElement);
defineElement('uui-table-row', UUITableRowElement);
defineElement('uui-table', UUITableElement);
