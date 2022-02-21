const getCustomPropertiesFromImports = require('./import-from.cjs');

const valueParser = require('postcss-value-parser'); // match custom property inclusions
// @TODO optimize to skip vars with fallbacks already


const customPropertiesRegExp = /(^|[^\w-])var\([\W\w]+\)/; // var\([\W\w]+,[\W\w]+\) template for detecting if skippable?
// whether the declaration should be potentially transformed

const isTransformableDecl = decl => customPropertiesRegExp.test(decl.value);

const {
  nodeToString
} = require('postcss-values-parser'); // eslint-disable-next-line no-empty-pattern


module.exports = opts => ({
  postcssPlugin: 'postcss-custom-properties-fallback',

  prepare() {
    // sources to import custom selectors from
    const importFrom = [].concat(Object(opts).importFrom || []); // promise any custom selectors are imported

    const customPropertiesPromise = getCustomPropertiesFromImports(importFrom);
    return {
      async Declaration(node) {
        if (isTransformableDecl(node)) {
          const customProperties = await customPropertiesPromise;
          const parsed = valueParser(node.value);
          parsed.walk(node => {
            // Only deal with vars without a fallback
            if (node.type !== 'function' || node.nodes.length !== 1) {
              return;
            }

            const fallback = customProperties[node.nodes[0].value];

            if (fallback && fallback.length === 1) {
              node.nodes.push({
                type: 'divider',
                value: ','
              }, {
                type: 'word',
                value: fallback
              });
            } //when fallback value contains more then one node, stringify them with value parser used to parse the customProperties object and add as one node type word.


            if (fallback && fallback.length > 1) {
              node.nodes.push({
                type: 'divider',
                value: ','
              }, {
                type: 'word',
                value: fallback.map(fallbackNode => nodeToString(fallbackNode)).join(' ')
              });
            }
          });
          node.value = parsed.toString();
        }
      }

    };
  }

});
//# sourceMappingURL=plugin.js.map
