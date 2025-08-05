import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { readPackageJson } from '../scripts/modify-pkgjson.mjs';
import rollupPostcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import postcssCustomPropertiesFallback from '../scripts/postcss-custom-properties-fallback/plugin.mjs';
import path from 'path';
import processLitCSSPlugin from '../scripts/processLitCSSPlugin.mjs';
import importCss from 'rollup-plugin-import-css';

// @ts-ignore-start
// eslint-disable-next-line -- // @typescript-eslint/ban-ts-comment // @ts-ignore
import properties from './uui-css/custom-properties.module.js'; // eslint-disable-line
// @ts-ignore-end

const tsconfigPath = new URL('../tsconfig.json', import.meta.url).pathname;

/**
 * @type {import('rollup-plugin-esbuild').Options}
 */
const esbuildOptions = { tsconfig: tsconfigPath, target: 'es2022' }; // TODO: We have to specify the 'target' manually here, because the tsconfig is not used correctly by rollup-plugin-esbuild

const rootDir = new URL('../', import.meta.url).pathname;

const createEsModulesConfig = (entryPoints = []) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `./lib/${name}.ts`,
        output: {
          file: `./lib/${name}.js`,
          format: 'es',
        },
        external: [/^lit/, /^@umbraco-ui/],
        plugins: [
          nodeResolve({ rootDir }),
          importCss({ from: undefined }),
          esbuild(esbuildOptions),
          processLitCSSPlugin(),
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
            plugins: [
              postcssImport({
                plugins: [
                  postcssUrl(), // This plugin is used to handle URLs in imported CSS files
                ],
              }),
              postcssCustomPropertiesFallback({ importFrom: properties }),
            ],
            extract: path.resolve(`./dist/${name}.css`),
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
          nodeResolve({ rootDir }),
          importCss(),
          processLitCSSPlugin(),
          minifyHTML.default(),
          esbuild({
            ...esbuildOptions,
            minify: true,
          }),
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
