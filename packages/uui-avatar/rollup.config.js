import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-avatar.element', 'uui-avatar.test'],
  bundles: ['index'],
});
