import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-loader-bar.element'],
  bundles: ['index'],
});
