# Scripts

## `lint:eslint`

Lints the project files with ESLint.

## `format:eslint`

Formats the project files with ESLint.

## `lint:prettier`

Lints the project files with Prettier.

## `format:prettier`

Formats the project files with Prettier.

## `lint`

Lints with both ESLint and Prettier.

## `format`

Formats with both ESLint and Prettier. Runs before each commit via Husky + lint-staged.

## `test`

Run all component tests with coverage (browser-based via Web Test Runner).

## `test:watch`

Run tests in watch mode.

## `test:coverage-for`

Run tests for a single component by folder name, e.g. `npm run test:coverage-for button`.

## `dev`

Alias for `storybook`.

## `build`

Build the library (Vite + TypeScript declarations + custom-elements.json).

## `build:watch`

Run TypeScript declarations once, then enter Vite watch mode for incremental rebuilds. Useful with `npm link` for live development against a consuming project.

## `clean`

Remove build artifacts (`dist/`, `custom-elements.json`, `vscode.html-custom-data.json`).

## `analyze`

Generate `custom-elements.json` and `vscode.html-custom-data.json` from component source files. Run after adding or updating JSDoc documentation.

## `storybook`

Serve the Storybook dev server on port 6006.

## `storybook:build`

Build the Storybook for static deployment.

## `new-component`

Scaffold a new component (interactive prompts). Creates the registration file, element class, test, story, and README under `src/components/`.
