import { UUIProdConfig } from '../rollup-package.config.mjs';

export default UUIProdConfig({
  entryPoints: ['index'],
  cssFiles: ['uui-font', 'uui-text', 'uui-css'],
});
