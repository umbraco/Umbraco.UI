import postcss from 'postcss';
import syntax from 'postcss-syntax';
import postcssCustomPropertiesFallback from 'postcss-custom-properties-fallback';
//import { extractCustomProperties } from './extract-custom-properties.mjs';
import { createFilter } from '@rollup/pluginutils';
import autoprefixer from 'autoprefixer';
import * as fs from 'fs/promises';

export default function processLitCSS(options = {}) {
  var filter = createFilter(options?.include, options?.exclude, {});

  let properties = null;

  return {
    name: 'add-fallback-values',
    async buildStart() {
      console.log('buildStart ##################################');
      //properties = await extractCustomProperties(options.mainStylesPath);
      try {
        properties = await fs.readFile(
          './packages/uui-css/custom-properties.js'
        );
        console.log(properties);
        // TODO: Fix this.
      } catch (err) {
        console.error(err);
      }
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
