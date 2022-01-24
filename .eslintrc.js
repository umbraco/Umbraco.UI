module.exports = {
  ignorePatterns: ['vite.*.js', 'src/**/*'],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'html', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended',
  ],
  rules: {
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', //TODO: Remove (maybe)
    '@typescript-eslint/ban-types': 'off', //TODO: Remove (maybe)
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  env: {
    browser: true,
    node: true,
  },
};
