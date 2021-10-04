/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-empty-function */
import postcss from 'postcss';
import syntax from 'postcss-syntax';
import postcssCustomPropertiesFallback from 'postcss-custom-properties-fallback';
import {extractCustomProperties} from './extract-custom-properties'

export default function processLitCSS(options = {}) {
  const { hook = 'buildEnd' } = options;

  let properties = null;

  // const extractCustomProperties = async () => {
  //   const CSS_PATH = path.resolve('../../out-css/style/index.css');
  //   console.log('processing main css...');

  //   try {
  //     const customProperties = { customProperties: {} };

  //     const cssFile = await fs.readFile(CSS_PATH, 'utf8');

  //     const cssResult = await postcss([
  //       postcssCustomProperties({
  //         importFrom: [CSS_PATH],
  //         exportTo: customProperties,
  //       }),
  //     ]).process(cssFile, { from: CSS_PATH, to: './css-test.css' });

  //     for (const key in customProperties.customProperties) {
  //       const valueNode = postCssValueParser.parse(
  //         customProperties.customProperties[key]
  //       );
  //       const onlyVars = valueNode.nodes.filter(node => node.isVar);
  //       if (onlyVars.length === 1) {
  //         const keyToFind = onlyVars[0].params
  //           .trim()
  //           .substring(1, onlyVars[0].params.length - 1);

  //         customProperties.customProperties[key] =
  //           customProperties.customProperties[keyToFind];
  //       }
  //     }

  //     return customProperties;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return {
    name: 'add-fallback-values',
    async buildStart() {
      properties = await extractCustomProperties('../../out-css/style/index.css');
    },
    async transform(code) {
    
      try {
        const result = await postcss([
          postcssCustomPropertiesFallback({ importFrom: properties }),
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

//add filter   https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter

