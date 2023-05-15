import * as fs from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import postcssCustomProperties from 'postcss-custom-properties';

export const CacheCustomProperties = async masterCSSPath => {
  const CSS_PATH = path.resolve(masterCSSPath);

  try {
    const fileData = { customProperties: {} };

    const cssFile = await fs.readFile(CSS_PATH, 'utf8');

    const postcssResult = await postcss([postcssCustomProperties()]).process(
      cssFile,
      {
        from: CSS_PATH,
      }
    );

    postcssResult.root.walkDecls(decl => {
      if (decl.prop.startsWith('--')) {
        fileData.customProperties[decl.prop] = decl.value;
      }
    });

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
