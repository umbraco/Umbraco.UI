import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-ref-node-member.element'],
  bundle: 'index',
});
