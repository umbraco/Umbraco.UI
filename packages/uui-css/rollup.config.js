import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  namespace: 'UUICSS',
  entryPoints: ['local-typography.styles'],
  cssFiles: ['local-typography'],
  bundle: 'local-typography.styles',
});
