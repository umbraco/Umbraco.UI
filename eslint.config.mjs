import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import localRules from 'eslint-plugin-local-rules';
import wcPlugin from 'eslint-plugin-wc';
import litPlugin from 'eslint-plugin-lit';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  // Recommended config applied to all files
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  wcPlugin.configs['flat/recommended'],
  litPlugin.configs['flat/recommended'],
  localRules.configs['all-warn'],
  eslintPluginPrettierRecommended,

  // Global ignores
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '**/*.{cjs,mjs,js}',
      'vite.config.ts',
      'stories/',
      '**/.storybook/**',
    ],
  },

  // Global config
  {
    plugins: {
      'local-rules': localRules,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
      globals: globals.browser,
    },
    rules: {
      semi: ['warn', 'always'],
      'no-unused-vars': 'off', //Let '@typescript-eslint/no-unused-vars' catch the errors to allow unused function parameters (ex: in interfaces)
      'no-var': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off', //TODO: Remove (maybe)
      '@typescript-eslint/ban-types': 'off', //TODO: Remove (maybe)
      'lit/no-useless-template-literals': 'error',
      'lit/prefer-nothing': 'error',
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
  },
];
