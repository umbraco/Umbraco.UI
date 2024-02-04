module.exports = {
  ignorePatterns: ['vite.*.js', 'packages/**/*.js', 'src/**/*'],
  root: true,
  plugins: ['html', 'import', 'eslint-plugin-local-rules'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:wc/recommended',
        'plugin:lit/recommended',
        'plugin:lit-a11y/recommended',
        'plugin:storybook/recommended',
      ],
      rules: {
        // disable the rule for all files
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off', //TODO: Remove (maybe)
        '@typescript-eslint/ban-types': 'off', //TODO: Remove (maybe)
        'lit/no-useless-template-literals': 'error',
        'lit/prefer-nothing': 'error',
        'local-rules/uui-class-prefix': 'warn',
        'local-rules/prefer-static-styles-last': 'warn',
        'no-restricted-syntax': [
          'warn',
          {
            message:
              'Elements should not be defined with customElement, use defineElement instead.',
            selector:
              'ClassDeclaration > Decorator[expression.callee.name="customElement"]',
          },
        ],
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
        wc: {
          elementBaseClasses: ['LitElement'], // Recognize `LitElement` as a Custom Element base class
        },
      },
    },
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
