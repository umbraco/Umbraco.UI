import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-tag.element'],
  bundle: 'index',
});
