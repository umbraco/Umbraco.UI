import { UUIProdConfig } from '../rollup-package.config.mjs';

export default UUIProdConfig({
  entryPoints: [
    'index',
    'animations/index',
    'events/index',
    'mixins/index',
    'types/index',
    'registration/index',
    'utils/index',
    'version',
  ],
});
