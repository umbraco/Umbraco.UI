import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-tag.element', 'uui-tag.test'],
  bundles: ['index'],
});
