import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-checkbox.element', 'uui-checkbox.test'],
  bundles: ['index'],
});
