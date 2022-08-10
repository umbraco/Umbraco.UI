import * as fs from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import postcssCustomProperties from 'postcss-custom-properties';
import * as postCssValueParser from 'postcss-values-parser';
import syntax from 'postcss-jsx';

export const CacheCustomProperties = async masterCSSPath => {
  const CSS_PATH = path.resolve(masterCSSPath);

  try {
    const fileData = { customProperties: {} };

    const cssFile = await fs.readFile(CSS_PATH, 'utf8');

    await postcss([
      postcssCustomProperties({
        importFrom: [CSS_PATH],
        exportTo: fileData,
      }),
    ]).process(cssFile, {
      syntax: syntax,
      from: CSS_PATH,
      to: './css-test.css',
    });

    for (const key in fileData.customProperties) {
      const valueNode = postCssValueParser.parse(
        fileData.customProperties[key]
      );
      const onlyVars = valueNode.nodes.filter(node => node.isVar);
      if (onlyVars.length === 1) {
        const keyToFind = onlyVars[0].params
          .trim()
          .substring(1, onlyVars[0].params.length - 1);

        fileData.customProperties[key] = fileData.customProperties[keyToFind];
      }
    }

    let json = JSON.stringify(fileData);

    try {
      await fs.writeFile(
        './custom-properties.module.js',
        `export default ${json};`,
        'utf8'
      );
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};
