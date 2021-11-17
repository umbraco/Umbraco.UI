import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-dialog-confirm.element'],
  bundle: 'index',
});
