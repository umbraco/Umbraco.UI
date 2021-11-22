import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-folder-symbol.element'],
  bundles: ['index'],
});
