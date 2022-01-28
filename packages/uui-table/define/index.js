import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUITableCellElement } from '../lib/uui-table-cell.element';
import { UUITableColumnElement } from '../lib/uui-table-column.element';
import { UUITableHeadCellElement } from '../lib/uui-table-head-cell.element';
import { UUITableHeadElement } from '../lib/uui-table-head.element';
import { UUITableRowElement } from '../lib/uui-table-row.element';
import { UUITableElement } from '../lib/uui-table.element';

defineElement('uui-table-column', UUITableColumnElement);
defineElement('uui-table-head-cell', UUITableHeadCellElement);
defineElement('uui-table-head', UUITableHeadElement);
defineElement('uui-table-cell', UUITableCellElement);
defineElement('uui-table-row', UUITableRowElement);
defineElement('uui-table', UUITableElement);
