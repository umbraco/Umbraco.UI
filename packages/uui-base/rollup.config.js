import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: [
    'index',
    'animations/index',
    'events/index',
    'mixins/index',
    'types/index',
    'uui-boolean-input/index',
  ],
});
