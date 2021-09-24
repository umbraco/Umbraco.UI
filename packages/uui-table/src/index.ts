import { UUITableRowElement } from './uui-table-row.element';
import { UUITableCellElement } from './uui-table-cell.element';
import { UUITableHeadCellElement } from './uui-table-head-cell.element';

import { UUITableHeadElement } from './uui-table-head.element';
import { UUITableColumnElement } from './uui-table-column.element';
import { UUITableElement } from './uui-table.element';

customElements.define('uui-table-column', UUITableColumnElement as any);
customElements.define('uui-table-head-cell', UUITableHeadCellElement as any);
customElements.define('uui-table-head', UUITableHeadElement as any);
customElements.define('uui-table-cell', UUITableCellElement as any);
customElements.define('uui-table-row', UUITableRowElement as any);
customElements.define('uui-table', UUITableElement as any);
