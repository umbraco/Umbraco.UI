import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-slider.element', 'uui-slider.test'],
  bundles: ['index'],
});
