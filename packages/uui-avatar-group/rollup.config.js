import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-avatar-group.element', 'uui-avatar-group.test'],
  bundles: ['index'],
});
