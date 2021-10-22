import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-toggle.element'],
  bundle: 'index',
});
