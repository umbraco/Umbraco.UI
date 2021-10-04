import esbuild from 'rollup-plugin-esbuild';
import typescript2 from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import processLitCSS from '../scripts/rollup-plugin-fallback-values';
//import dts from 'rollup-plugin-dts';

//const excludePatterns = ['**/events.ts'];
const processLitCSSOptions = {
  include: ['**/uui-*.ts', '**/*Mixin.ts', '**/*.styles.ts'],
  exclude: ['**/uui-base/src/events/**'],
  mainStylesPath: '../../out-css/style/index.css'
};

export const UUIProdConfig = ({ entryPoints = [], bundles = [] }) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `src/${name}.ts`,
        output: {
          file: `./${name}.mjs`,
          format: 'es',
        },
        plugins: [processLitCSS(processLitCSSOptions), esbuild()],
      };
    }),
    // ...bundles.map(name => {
    //   return {
    //     input: `src/${name}.ts`,
    //     output: {
    //       dir: './dist',
    //       format: 'umd',
    //       sourcemap: true,
    //     },
    //     plugins: [nodeResolve(),processLitCSS(processLitCSSOptions), esbuild()],
    //   };
    // }),
    /*
    ...bundles.map(name => {
      return {
        input: `${name}.d.ts`,
        output: {
          file: `dist/${name}.d.ts`,
          format: 'es'
        },
        plugins: [dts()]
      }
    }),
    */
  ];
};
