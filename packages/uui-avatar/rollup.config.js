// import componentConfig from '../rollup-component.config';
// export default componentConfig;

import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-avatar.element'],
  bundles: ['index'],
});
