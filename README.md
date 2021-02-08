# Umbraco.UI

This is a WIP UI-library for Umbraco CMS and friends. This means that all elements should make sense in any context. 

The elements are built with LitElement and is meant to be displayed with storybook. You can build the library as a single bundle (with dependencies), or you can just import source directly and build yourself. 

The storybook knobs and docs are automatically created from the source, so please make sure to add the appropriate jsdoc-comments. See an existing element (eg. uui-button) for inspiration, or checkout [web-component-analyzer](https://github.com/runem/web-component-analyzer) for docs.

Once the project is "ready", it shall be released on npm for consumption. 

## Get started
### Installation:

This project uses nodejs, so you should install `nodejs` as the package manager on your machine. See [installation guide](https://nodejs.org/en/).

```sh
git clone https://github.com/umbraco/Umbraco.UI.git
npm install
```

### Run storybook

This command will build the project, start a server running storybook and watch for changes.

```sh
npm run storybook
```

### Run tests

This command will build the project and run tests.

```sh
npm run test
```


### Scripts overview
- `storybook` opens storybook for the elements
- `test` runs your test suite with Web Test Runner
' `format` runs autoformatter
- `lint` runs the linter for your project

## Contributions
- 📥 Pull requests and 🌟 Stars are always welcome.
- Read our [contributing guide](CONTRIBUTING.md) to get started.
