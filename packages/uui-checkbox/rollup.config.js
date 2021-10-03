import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-checkbox.element', 'uui-checkbox.test'],
  bundles: ['index'],
});
