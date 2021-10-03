// import componentConfig from '../rollup-component.config';
// export default componentConfig;

import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: [
    'index',
    'uui-tab.element',
    'uui-tab-group.element',
    'uui-tabs.test',
  ],
  bundles: ['index'],
});
