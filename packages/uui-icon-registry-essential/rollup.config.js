import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-icon-registry-essential.element'],
  bundle: 'index',
});
