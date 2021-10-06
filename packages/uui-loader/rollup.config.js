import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-loader.element', 'uui-loader.test'],
  bundles: ['index'],
});
