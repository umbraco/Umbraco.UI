import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  namespace: 'UUICSS',
  entryPoints: ['index'],
  cssFiles: ['uui-root', 'uui-text'],
  bundle: 'index',
});
