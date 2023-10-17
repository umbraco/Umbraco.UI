'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  /** @type {import('eslint').Rule.RuleModule} */
  'uui-class-prefix': {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Ensure that all class declarations are prefixed with "UUI"',
        category: 'Best Practices',
        recommended: true,
      },
      schema: [],
    },
    create: function (context) {
      function checkClassName(node) {
        if (node.id && node.id.name && !node.id.name.startsWith('UUI')) {
          context.report({
            node: node.id,
            message: 'Class declaration should be prefixed with "UUI"',
          });
        }
      }

      return {
        ClassDeclaration: checkClassName,
      };
    },
  },

  /** @type {import('eslint').Rule.RuleModule}*/
  'prefer-static-styles-last': {
    meta: {
      type: 'suggestion',
      docs: {
        description:
          'Enforce the "styles" property with the static modifier to be the last property of a class that ends with "Element".',
        category: 'Best Practices',
        recommended: true,
      },
      fixable: 'code',
      schema: [],
    },
    create: function (context) {
      return {
        ClassDeclaration(node) {
          const className = node.id.name;
          if (className.endsWith('Element')) {
            const staticStylesProperty = node.body.body.find(bodyNode => {
              return (
                bodyNode.type === 'PropertyDefinition' &&
                bodyNode.key.name === 'styles' &&
                bodyNode.static
              );
            });
            if (staticStylesProperty) {
              const lastProperty = node.body.body[node.body.body.length - 1];
              if (lastProperty.key.name !== staticStylesProperty.key.name) {
                context.report({
                  node: staticStylesProperty,
                  message:
                    'The "styles" property should be the last property of a class declaration.',
                  data: {
                    className: className,
                  },
                  fix: function (fixer) {
                    const sourceCode = context.getSourceCode();
                    const staticStylesPropertyText =
                      sourceCode.getText(staticStylesProperty);
                    return [
                      fixer.replaceTextRange(staticStylesProperty.range, ''),
                      fixer.insertTextAfterRange(
                        lastProperty.range,
                        '\n	\n	' + staticStylesPropertyText
                      ),
                    ];
                  },
                });
              }
            }
          }
        },
      };
    },
  },
};
