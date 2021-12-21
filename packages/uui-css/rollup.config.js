import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  namespace: 'UUICSS',
  entryPoints: ['uui-text.styles'],
  cssFiles: ['uui-root', 'uui-text'],
  bundle: 'uui-text.styles',
});
