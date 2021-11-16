import postcss from 'postcss';
import * as fs from 'fs/promises';
import path from 'path';
import postcssCustomProperties from 'postcss-custom-properties';
import * as postCssValueParser from 'postcss-values-parser';

export const extractCustomProperties = async (masterCSSPath, cache = false) => {
  //'../../out-css/style/index.css'

  const CSS_PATH = path.resolve(masterCSSPath);

  try {
    const customProperties = { customProperties: {} };

    const cssFile = await fs.readFile(CSS_PATH, 'utf8');

    const cssResult = await postcss([
      postcssCustomProperties({
        importFrom: [CSS_PATH],
        exportTo: customProperties,
      }),
    ]).process(cssFile, { from: CSS_PATH, to: './css-test.css' });

    for (const key in customProperties.customProperties) {
      const valueNode = postCssValueParser.parse(
        customProperties.customProperties[key]
      );
      const onlyVars = valueNode.nodes.filter(node => node.isVar);
      if (onlyVars.length === 1) {
        const keyToFind = onlyVars[0].params
          .trim()
          .substring(1, onlyVars[0].params.length - 1);

        customProperties.customProperties[key] =
          customProperties.customProperties[keyToFind];
      }
    }

    if (cache) {
      let json = JSON.stringify(customProperties);

      try {
        await fs.writeFile(
          './custom-properties.js',
          `export default ${json}`,
          'utf8'
        );
      } catch (err) {
        console.error(err);
      }
    }

    return customProperties;
  } catch (err) {
    console.log(err);
  }
};
