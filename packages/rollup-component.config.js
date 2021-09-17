import esbuild from 'rollup-plugin-esbuild';
import typescript2 from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

const name = require('./package.json').name.replace('\@umbraco-ui\/', '');
const outDir = 'dist';

export default [
  
  // UMD Bundle
  {
    input: 'src/index.ts',
    output: {
      file: `${outDir}/${name}.js`,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [esbuild()]
  },

  // ES MAIN BUNDLE
  {
    input: 'src/index.ts',
    output: {
      file: `index.mjs`,
      format: 'es'
    },
    plugins: [typescript2({ clean: true }), esbuild()]
  },

  // ES ELEMENT BUNDLE
  {
    input: `src/${name}.element.ts`,
    output: {
      file: `${name}.element.mjs`,
      format: 'es'
    },
    plugins: [esbuild()]
  },

  // DECLARATIONS BUNDLE
  {
    input: 'index.d.ts',
    output: {
      file: `dist/${name}.d.ts`,
      format: 'es'
    },
    plugins: [dts()]
  },
]