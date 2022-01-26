import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-toast-notification-container.element'],
  bundle: 'index',
});
