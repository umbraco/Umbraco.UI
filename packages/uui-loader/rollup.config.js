import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-loader.element'],
  bundles: ['index'],
});
