import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: [
    'index',
    'uui-table.element',
    'uui-table-row.element',
    'uui-table-cell.element',
    'uui-table-column.element',
    'uui-table-head.element',
    'uui-table-head-cell.element',
  ],
  bundle: 'index',
});
