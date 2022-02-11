import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index'],
  cssFiles: ['uui-font', 'uui-text'],
});
