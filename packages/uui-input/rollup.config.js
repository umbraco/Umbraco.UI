import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-input.element', 'uui-input.test'],
  bundles: ['index'],
});
