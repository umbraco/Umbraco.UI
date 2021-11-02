# Scripts

## `lint:eslint`

Lints the projects files with esLint.

## `format:eslint`

Formats the project files with esLint.

## `lint:prettier`

Lints the project files with prettier.

## `format:prettier`

Formats the project files with prettier.

## `lint`

Lints with both esLint and prettier.

## `format`

Formats with both esLint and prettier. Runs before each commit.

## `storybook`

Serves UI Library Storybook.

## `storybook:build`

Builds the storybook.

## `storybook:analyze`

Creates or updates the custom-elements.json file. Run to update the docs in storybook after adding documentation.

## `test`

Run test.

## `test:watch`

Run tests in watch mode.

## `build`

Build each package.

## `build:css`

Run postcss on the main stylesheet

## `build:prod`

Build for production. Clean the build files, lint, run tests, build each package separately.

## `clean`

Clean build artifacts in every package.

## `lerna:publish`

For automation use only.

## `lerna:version`

Bumps the versions of all the packages that have changed before. Cleans the package-lock.json and runs npm install to update the dependencies everywhere. Package-lock.json has to be committed after this script makes it's own commit, otherwise the auto-build and publishing will fail. Before running use `npm run diff` to see all the changes in the packages. Think carefully about wether you're introducing a breaking change. When in doubt follow the [semver spec](https://semver.org/). This script is for HQ use only, PRs that bump components versions will be rejected.

## `diff`

Diff the packages with the last published version.

## `lerna-fix`

Remove the lerna artifacts (`gitHead` field) from package.json of each component if publish script fails.

## `lerna:modify-package`

Add, modify or remove a filed in each package.json. Takes following args:

1: action type `'add' | 'remove'`
2: key
3: value (mandatory if you're adding or modifying the field)

Running this will add a homepage field to the package.json in every component. It it is already there it will change its value.

```zsh
npm run lerna:modify-package add homepage https://github.com
```

This will remove the homepage field from the package.json in each package.

```zsh
npm run lerna:modify-package remove homepage
```

## `bootstrap`

Generate `tsconfig` for each package.
