import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import processLitCSS from '../scripts/rollup-plugin-fallback-values';
import path from 'path'

const processLitCSSOptions = {
  include: ['**/uui-*.ts', '**/*Mixin.ts', '**/*.styles.ts'],
  exclude: ['**/uui-base/src/events/**'],
  mainStylesPath: '../uui-base/lib/styles/index.css',
  autoprefixerEnv: 'last 1 version'
};

export const UUIProdConfig = ({ entryPoints = [], bundles = [] }) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `./src/${name}.ts`,
        output: {
          file: `./lib/${name}.js`,
          format: 'es',
        },
        plugins: [processLitCSS(processLitCSSOptions), esbuild()],
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
        plugins: [nodeResolve(), processLitCSS(processLitCSSOptions), esbuild()],
      };
    }),
  ];
};
