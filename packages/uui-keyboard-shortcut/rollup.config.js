import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-keyboard-shortcut.element'],
  bundles: ['index'],
});
