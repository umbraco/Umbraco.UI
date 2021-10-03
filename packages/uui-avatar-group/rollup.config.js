import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-avatar-group.element', 'uui-avatar-group.test'],
  bundles: ['index'],
});
