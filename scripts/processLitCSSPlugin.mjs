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

export default function () {
  return {
    name: 'process-lit-postcss-esm',

    async transform(code, id) {
      if (filter(id)) {
        const additionalPlugins = [
          postcssCustomPropertiesFallback({ importFrom: customProperties }),
        ];

        try {
          return await postcssConfig().then(async ({ plugins }) => {
            const result = await postcss([
              ...plugins,
              ...additionalPlugins,
            ]).process(code, {
              syntax: syntax,
              map: null, // provide source map if available
              from: undefined,
            });

            return {
              code: result.content,
            };
          });
        } catch (e) {
          console.error(e);
        }
      }
    },
  };
}
