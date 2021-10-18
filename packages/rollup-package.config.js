import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import processLitCSS from '../scripts/rollup-plugin-fallback-values';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const processLitCSSOptions = {
  include: ['**/uui-*.ts', '**/*Mixin.ts', '**/*.styles.ts'],
  exclude: ['**/uui-base/lib/events/**'],
  mainStylesPath: '../../out-css/index.css',
  autoprefixerEnv: 'last 1 version',
};

const esbuidOptions = { minify: true };

export const UUIProdConfig = ({ entryPoints = [], bundles = [] }) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `./lib/${name}.ts`,
        output: {
          file: `./lib/${name}.js`,
          format: 'es',
        },
        plugins: [processLitCSS(processLitCSSOptions), esbuild()],
      };
    }),
    ...bundles.map(name => {
      return {
        input: `lib/${name}.ts`,
        output: {
          dir: './dist',
          format: 'umd',
          sourcemap: true,
        },
        plugins: [
          nodeResolve(),
          processLitCSS(processLitCSSOptions),
          minifyHTML(),
          esbuild(esbuidOptions),
        ],
      };
    }),
  ];
};
