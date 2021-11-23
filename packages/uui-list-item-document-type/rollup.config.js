import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-list-item-document-type.element'],
  bundle: 'index',
});
