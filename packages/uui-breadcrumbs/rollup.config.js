import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: [
    'index',
    'uui-breadcrumbs.element',
    'uui-breadcrumb-item.element',
    'uui-breadcrumbs.test',
    'uui-breadcrumb-item.test',
  ],
  bundles: ['index'],
});
