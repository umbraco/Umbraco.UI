import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: [
    'index',
    'uui-table.element',
    'uui-table-row.element',
    'uui-table-cell.element',
    'uui-table-column.element',
    'uui-table-head.element',
    'uui-table-head-cell.element',
    'uui-table.test',
  ],
  bundles: ['index'],
});
