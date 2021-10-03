import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-loader.element', 'uui-loader.test'],
  bundles: ['index'],
});
