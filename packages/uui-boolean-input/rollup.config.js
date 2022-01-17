import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-boolean-input.element', 'UUIBooleanInputEvent'],
  bundle: 'index',
});
