import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-button-group.element', 'uui-button-group.test'],
  bundles: ['index'],
});
