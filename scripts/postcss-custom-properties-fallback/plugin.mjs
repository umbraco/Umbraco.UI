import getCustomPropertiesFromImports from './import-from.mjs';

// Match var(--prop) without an existing fallback (no comma inside)
const varWithoutFallbackRegex = /var\(\s*(--[\w-]+)\s*\)/g;

const isTransformableDecl = decl => varWithoutFallbackRegex.test(decl.value);

/**
 * @param {{importFrom: any}} opts
 * @returns {import('postcss').Plugin}
 */
const plugin = opts => ({
  postcssPlugin: 'postcss-custom-properties-fallback',

  prepare() {
    const importFrom = [].concat(Object(opts).importFrom || []);
    const customPropertiesPromise = getCustomPropertiesFromImports(importFrom);
    return {
      async Declaration(node) {
        if (isTransformableDecl(node)) {
          const customProperties = await customPropertiesPromise;
          // Reset lastIndex since the regex is global and used in test() above
          varWithoutFallbackRegex.lastIndex = 0;
          node.value = node.value.replace(
            varWithoutFallbackRegex,
            (match, prop) => {
              const fallback = customProperties[prop];
              return fallback ? `var(${prop}, ${fallback})` : match;
            },
          );
        }
      },
    };
  },
});

export default plugin;
