import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-radio.element', 'uui-radio-group.element'],
  bundle: 'index',
});
