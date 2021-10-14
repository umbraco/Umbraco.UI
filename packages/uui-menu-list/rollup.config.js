import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-menu-list.element', 'uui-menu-item.element'],
  bundles: ['index'],
});
