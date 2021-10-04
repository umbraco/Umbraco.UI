import postcss from 'postcss';
import syntax from 'postcss-syntax';
import postcssCustomPropertiesFallback from 'postcss-custom-properties-fallback';
import { extractCustomProperties } from './extract-custom-properties';
import { createFilter } from '@rollup/pluginutils';
import autoprefixer from 'autoprefixer';

export default function processLitCSS(options = {}) {
  var filter = createFilter(options?.include, options?.exclude, {});

  let properties = null;

  return {
    name: 'add-fallback-values',
    async buildStart() {
      properties = await extractCustomProperties(options.mainStylesPath);
    },
    async transform(code, id) {
      if (!filter(id)) return;

      try {
        const result = await postcss([
          postcssCustomPropertiesFallback({ importFrom: properties }),
          autoprefixer({ env: options.autoprefixerEnv }),
        ]).process(code, { syntax: syntax });

        return {
          code: result.content,
        };
      } catch (e) {
        console.log(e);
      }
    },
  };
}
