import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-file-symbol.element'],
  bundles: ['index'],
});
