import { createFilter } from '@rollup/pluginutils';
import postcss from 'postcss';
import syntax from 'postcss-jsx';
import postcssConfig from 'postcss-load-config';

import customProperties from '../packages/uui-css/custom-properties.module.js';
import postcssCustomPropertiesFallback from './postcss-custom-properties-fallback/plugin.mjs';

const options = {
  include: ['**/index.ts', '**/uui-*.ts', '**/*Mixin.ts', '**/*.styles.ts'],
  exclude: [
    '**/uui-base/lib/events/**',
    '**/uui-base/lib/registration/**',
    '**/uui-base/lib/types/**',
    '**/uui-base/lib/utils/**',
    '**/*.story.ts',
    '**/*.d.ts',
    '**/uui-css/**/*.ts',
  ],
};

const filter = createFilter(options.include, options.exclude, {});

/**
 * @returns {import('vite').PluginOption}
 */
export default function () {
  const configPromise = postcssConfig();
  const fallbackPlugin = postcssCustomPropertiesFallback({
    importFrom: customProperties,
  });

  return {
    name: 'process-lit-postcss-esm',

    async transform(code, id) {
      if (filter(id)) {
        try {
          const { plugins } = await configPromise;
          const result = await postcss([...plugins, fallbackPlugin]).process(
            code,
            {
              syntax: syntax,
              map: null, // provide source map if available
              from: undefined,
            },
          );

          return {
            code: result.content,
          };
        } catch (e) {
          console.error(e);
        }
      }
    },
  };
}
