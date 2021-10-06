import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-toggle.element', 'uui-toggle.test'],
  bundles: ['index'],
});
