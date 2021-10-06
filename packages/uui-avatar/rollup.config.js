import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-avatar.element', 'uui-avatar.test'],
  bundles: ['index'],
});
