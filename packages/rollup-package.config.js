import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export const UUIProdConfig = ({ entryPoints = [], bundles = [] }) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `./src/${name}.ts`,
        output: {
          file: `./lib/${name}.js`,
          format: 'es',
        },
        plugins: [esbuild()],
      };
    }),
    ...bundles.map(name => {
      return {
        input: `src/${name}.ts`,
        output: {
          dir: './dist',
          format: 'umd',
          sourcemap: true,
        },
        plugins: [nodeResolve(), esbuild()],
      };
    }),
  ];
};
