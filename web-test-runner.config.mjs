import fs from 'fs';

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
};