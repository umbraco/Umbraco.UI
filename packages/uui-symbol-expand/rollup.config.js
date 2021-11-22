import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-symbol-expand.element'],
  bundle: 'index',
});
