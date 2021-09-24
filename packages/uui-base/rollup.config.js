import { UUIProdConfig } from '../rollup-component.config';

export default UUIProdConfig({
  entryPoints: [
    'index',
    'animations',
    'events',
    'mixins',
    'types',
    'uui-boolean-input',
  ],
});
