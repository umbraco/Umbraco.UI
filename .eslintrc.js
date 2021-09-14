module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'html'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:lit/recommended",
    "plugin:lit-a11y/recommended"
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // "@open-wc/eslint-config",
    // "eslint-config-prettier",
    
  ],
  rules: {
    // disable the rule for all files
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // 'import/named': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // 'import/no-unresolved': 'off',
  },
};
