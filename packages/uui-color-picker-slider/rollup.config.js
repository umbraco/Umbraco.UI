import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-color-picker-slider.element'],
  bundle: 'index',
});
