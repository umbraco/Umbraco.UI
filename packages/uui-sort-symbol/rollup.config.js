import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-sort-symbol.element'],
  bundle: 'index',
});
