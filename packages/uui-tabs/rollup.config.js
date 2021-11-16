import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-tab.element', 'uui-tab-group.element'],
  bundle: 'index',
});
