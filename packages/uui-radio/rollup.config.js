import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-radio.element', 'uui-radio-group.element'],
  bundles: ['index'],
});
