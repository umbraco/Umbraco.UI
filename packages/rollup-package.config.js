import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import litCSSFallbackValuesPlugin from '../scripts/litCSSFallbackValuesPlugin';
import postCSSFallbackValuesPlugins from '../scripts/postCSSFallbackValuesPlugins';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { readPackageJson } from '../scripts/modify-pkgjson.mjs';
import rollupPostcss from 'rollup-plugin-postcss';
import path from 'path';
import importCss from 'rollup-plugin-import-css';

const processLitCSSOptions = {
  include: ['**/uui-*.ts', '**/*Mixin.ts', '**/*.styles.ts'],
  exclude: ['**/uui-base/lib/events/**'],
  mainStylesPath: '../uui-css/dist/root.css', // NOT USED!
  autoprefixerEnv: 'last 1 version',
};
const processPostCSSOptions = {
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
        plugins: [
          importCss({ from: undefined }),
          litCSSFallbackValuesPlugin(processLitCSSOptions),
          esbuild(),
        ],
      };
    }),
  ];
};

const createCSSFilesConfig = (cssFiles = []) => {
  return [
    ...cssFiles.map(name => {
      return {
        input: `./lib/${name}.css`,
        output: {
          file: `./dist/${name}.css`,
        },
        plugins: [
          rollupPostcss({
            extract: path.resolve(`./dist/${name}.css`),
            plugins: postCSSFallbackValuesPlugins(processPostCSSOptions),
          }),
        ],
      };
    }),
  ];
};

const createBundleConfig = (bundle, namespace) => {
  const packageJson = readPackageJson('./');
  const bundleName = packageJson.name.replace('@umbraco-ui/', '');

  return bundle
    ? {
        input: `lib/${bundle}.ts`,
        output: {
          file: `./dist/${bundleName}.min.js`,
          format: 'umd',
          sourcemap: true,
          name: namespace,
        },
        plugins: [
          nodeResolve(),
          importCss(),
          litCSSFallbackValuesPlugin(processLitCSSOptions),
          minifyHTML(),
          esbuild(esbuidOptions),
        ],
      }
    : undefined;
};

export const UUIProdConfig = ({
  entryPoints = [],
  cssFiles = [],
  bundle,
  namespace = '',
}) => {
  const cssFilesConfig = createCSSFilesConfig(cssFiles);
  const esModulesConfig = createEsModulesConfig(entryPoints);
  const bundleConfig = createBundleConfig(bundle, namespace);
  return [...cssFilesConfig, ...esModulesConfig, bundleConfig].filter(x => x);
};
