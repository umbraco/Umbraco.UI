import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  namespace: 'UUICSS',
  entryPoints: ['uui-text.styles'],
  cssFiles: ['uui-text'],
  bundle: 'uui-text.styles',
});
