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
      },
    );

    /**
     * Walk through all the declarations and find the custom properties
     * and their values. Store them in the fileData object.
     */
    postcssResult.root.walkDecls(decl => {
      if (decl.prop.startsWith('--')) {
        fileData.customProperties[decl.prop] = decl.value;
      }
    });

    /**
     * Walk through all the custom properties and find the ones that
     * have a single var() value. Replace the value with the value of
     * the var() it references.
     */
    const singleVarRegex = /^\s*var\(\s*(--[\w-]+)\s*\)\s*$/;
    for (const key in fileData.customProperties) {
      const match = fileData.customProperties[key].match(singleVarRegex);
      if (match) {
        fileData.customProperties[key] = fileData.customProperties[match[1]];
      }
    }

    let json = JSON.stringify(fileData, null, '\t');

    try {
      await fs.writeFile(
        './custom-properties.module.js',
        `export default ${json};`,
        'utf8',
      );
    } catch (err) {
      console.error('Error writing file', err);
      process.exit(1);
    }
  } catch (err) {
    console.error('Error reading file', err);
    process.exit(1);
  }
};
