![UI Library](docs/images/UI.png)

# [Umbraco UI Library](https://uui.umbraco.com/)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE.md) [![Twitter](https://img.shields.io/twitter/follow/umbraco.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=umbraco)

This is a UI-library for [Umbraco CMS](https://umbraco.com/) and friends. It is a collection of user interface components that can be used to build Umbraco style interfaces.

The elements are web components built with [Lit](https://lit.dev/) and are meant to be displayed with [UI Library Storybook](https://uui.umbraco.com/).

The Storybook is also a development environment for the components.

If you want to use a component in your project find it in the table below and follow the instructions from components readme.

If you want to develop a component or contribute to the repository go to ["Get started"](#get-started) section.

## Components

| Component                                                                                                  | Status                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<uui-avatar-group>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-avatar-group)           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar-group)   |
| [`<uui-avatar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-avatar)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar)               |
| [`<uui-badge>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-badge)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-badge?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-badge)                 |
| [`uui-base`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-base)                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-base?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-base)                   |
| [`<uui-box>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-box)                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-box?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-box)                     |
| [`<uui-breadcrumbs>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-breadcrumbs)             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-breadcrumbs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-breadcrumbs)     |
| [`<uui-button>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-button)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button)               |
| [`<uui-button-group>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-button-group)           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button-group)   |
| [`<uui-checkbox>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-checkbox)                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-checkbox?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-checkbox)           |
| [`<uui-input>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-input)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input)                 |
| [`<uui-keyboard-shortcut>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-keyboard-shortcut) | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-keyboard-shortcut?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-shortcut)  |
| [`<uui-loader>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader)               |
| [`<uui-loader-bar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader-bar)               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader-bar)       |
| [`<uui-loader-circle>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader-circle)         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-circle?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader-circle) |
| [`<uui-radio>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-radio)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-radio?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-radio)                 |
| [`<uui-slider>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-slider)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-slider?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-slider)               |
| [`<uui-table>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-table)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-table?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-table)                 |
| [`<uui-tabs>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-tabs)                           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tabs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tabs)                   |
| [`<uui-tag>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-tag)                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tag?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tag)                     |
| [`<uui-toggle>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-toggle)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toggle?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toggle)               |
| [`uui` bundle package](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui)                        | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui)                             |
| [`<uui-caret>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-caret)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-caret?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-caret)                 |
| [`<uui-menu-item>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-menu-item)                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-menu-item?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-menu-item)         |
| [`<uui-pagination>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-pagination)               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-pagination?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-pagination)       |

## Get started

### Installation

This project uses nodejs, so you should install `nodejs` as the package manager on your machine. See [installation guide](https://nodejs.org/en/). The UI Library requires npm in version 7 or higher, due to the use of npm workspaces.

```sh
git clone https://github.com/umbraco/Umbraco.UI.git
npm install
```

### Run storybook

This command will start a server running storybook and watch for changes.

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
- `storybook:analyze` generate or update `custom-elements.json` file
- `test` runs your test suite with Web Test Runner
- `format` runs linter and autoformatter

See the rest of [the scripts here](docs/SCRIPTS.md).

## Contributions

- 📥 Pull requests and 🌟 Stars are always welcome.
- Read our [contributing guide](docs/CONTRIBUTING.md) to get started.
