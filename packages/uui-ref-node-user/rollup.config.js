import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-ref-node-user.element'],
  bundle: 'index',
});
