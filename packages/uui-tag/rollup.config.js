import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-tag.element', 'uui-tag.test'],
  bundles: ['index'],
});
