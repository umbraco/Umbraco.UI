import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-toggle.element', 'uui-toggle.test'],
  bundles: ['index'],
});
