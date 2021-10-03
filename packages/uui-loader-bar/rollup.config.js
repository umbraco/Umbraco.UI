import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-loader-bar.element', 'uui-loader-bar.test'],
  bundles: ['index'],
});
