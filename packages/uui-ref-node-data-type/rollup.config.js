import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-ref-node-data-type.element'],
  bundle: 'index',
});
