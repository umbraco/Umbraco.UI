import esbuild from 'rollup-plugin-esbuild';
import typescript2 from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import  processLitCSS  from '../scripts/rollup-plugin-fallback-values'
//import dts from 'rollup-plugin-dts';

export const UUIProdConfig = ({ entryPoints = [], bundles = [] }) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `src/${name}.ts`,
        output: {
          file: `./${name}.mjs`,
          format: 'es',
        },
        plugins: [processLitCSS(),
          esbuild(),
        ],
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
    //     plugins: [nodeResolve(),addFallbackValues(), esbuild()],
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
