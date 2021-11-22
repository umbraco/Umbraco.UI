import postcss from 'postcss';
import syntax from 'postcss-syntax';
import postcssCustomPropertiesFallback from 'postcss-custom-properties-fallback';
import { createFilter } from '@rollup/pluginutils';
import autoprefixer from 'autoprefixer';
import properties from '../packages/uui-css/custom-properties';

export default function litCSSFallbackValuesPlugin(options = {}) {
  var filter = createFilter(options?.include, options?.exclude, {});

  return {
    name: 'add-fallback-values',
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
