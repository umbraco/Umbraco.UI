import fs from 'fs';
import { esbuildPlugin } from '@web/dev-server-esbuild';

const packages = fs
  .readdirSync('packages')
  .filter(dir => fs.statSync(`packages/${dir}`).isDirectory());

export default {
  nodeResolve: true,
  groups: packages.map(pkg => ({
    name: pkg,
    files: `packages/${pkg}/**/*.test.js`,
    rootDir: './src'
  })),
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })],
};