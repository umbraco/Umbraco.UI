import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-symbol-sort.element'],
  bundle: 'index',
});
