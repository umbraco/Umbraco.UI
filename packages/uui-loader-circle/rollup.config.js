import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-loader-circle.element', 'uui-loader-circle.test'],
  bundles: ['index'],
});
