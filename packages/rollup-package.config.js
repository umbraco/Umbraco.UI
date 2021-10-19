import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import processLitCSS from '../scripts/rollup-plugin-fallback-values';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { readPackageJson } from '../scripts/modify-pkgjson.mjs';

const processLitCSSOptions = {
  include: ['**/uui-*.ts', '**/*Mixin.ts', '**/*.styles.ts'],
  exclude: ['**/uui-base/lib/events/**'],
  mainStylesPath: '../../out-css/index.css',
  autoprefixerEnv: 'last 1 version',
};

const esbuidOptions = { minify: true };

const createEsModulesConfig = (entryPoints = []) => {
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
  ];
};

const createBundleConfig = bundle => {
  const packageJson = readPackageJson('./');
  const bundleName = packageJson.name.replace('@umbraco-ui/', '');

  return bundle
    ? {
        input: `lib/${bundle}.ts`,
        output: {
          file: `./dist/${bundleName}.min.js`,
          format: 'umd',
          sourcemap: true,
        },
        plugins: [
          nodeResolve(),
          processLitCSS(processLitCSSOptions),
          minifyHTML(),
          esbuild(esbuidOptions),
        ],
      }
    : undefined;
};

export const UUIProdConfig = ({ entryPoints = [], bundle }) => {
  const esModulesConfig = createEsModulesConfig(entryPoints);
  const bundleConfig = createBundleConfig(bundle);
  return [...esModulesConfig, bundleConfig].filter(x => x);
};
