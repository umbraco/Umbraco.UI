import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-toast-notification-layout.element'],
  bundle: 'index',
});
