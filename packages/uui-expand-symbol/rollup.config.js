import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-expand-symbol.element'],
  bundle: 'index',
});
