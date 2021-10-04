import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-loader-circle.element', 'uui-loader-circle.test'],
  bundles: ['index'],
});
