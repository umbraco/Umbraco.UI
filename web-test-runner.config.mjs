import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: true,
  files: 'packages/**/*.test.ts',
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })]
};