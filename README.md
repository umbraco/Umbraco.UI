![UI Library](docs/images/UI.png)

# [Umbraco UI Library](https://uui.umbraco.com/)

[![Build](https://github.com/umbraco/Umbraco.UI/actions/workflows/tests.yml/badge.svg)](https://github.com/umbraco/Umbraco.UI/actions/workflows/tests.yml) [![Storybook](https://github.com/umbraco/Umbraco.UI/actions/workflows/azure-static-web-apps-delightful-beach-055ecb503.yml/badge.svg)](https://github.com/umbraco/Umbraco.UI/actions/workflows/azure-static-web-apps-delightful-beach-055ecb503.yml) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE.md) [![Twitter](https://img.shields.io/twitter/follow/umbraco.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=umbraco)

This is a UI-library for [Umbraco CMS](https://umbraco.com/) and friends. It is a collection of user interface components that can be used to build Umbraco style interfaces.

The elements are web components built with [Lit](https://lit.dev/) and are meant to be displayed with [UI Library Storybook](https://uui.umbraco.com/).

The Storybook is also a development environment for the components.

If you want to use a component in your project find it in the table below and follow the instructions from components readme.

If you want to develop a component or contribute to the repository go to ["Get started"](#get-started) section.

## Components

| Component                                                                         | Status                                                                                                                                                                              |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`uui` bundle package](packages/uui)                                              | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui)                                                           |
| [`uui-css` bundle package](packages/uui-css)                                      | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-css?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-css)                                                   |
| [`<uui-action-bar>`](packages/uui-action-bar)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-action-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-action-bar)                                     |
| [`<uui-avatar>`](packages/uui-avatar)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar)                                             |
| [`<uui-avatar-group>`](packages/uui-avatar-group)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar-group)                                 |
| [`<uui-badge>`](packages/uui-badge)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-badge?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-badge)                                               |
| [`<uui-base>`](packages/uui-base)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-base?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-base)                                                 |
| [`<uui-boolean-input>`](packages/uui-boolean-input)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-boolean-input?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-boolean-input)                               |
| [`<uui-box>`](packages/uui-box)                                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-box?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-box)                                                   |
| [`<uui-breadcrumbs>`](packages/uui-breadcrumbs)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-breadcrumbs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-breadcrumbs)                                   |
| [`<uui-button>`](packages/uui-button)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button)                                             |
| [`<uui-button-group>`](packages/uui-button-group)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button-group)                                 |
| [`<uui-button-inline-create>`](packages/uui-button-inline-create)                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-inline-create?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button-inline-create)                 |
| [`<uui-button-copy-text>`](packages/uui-button-copy-text)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-copy-text?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button-copy-text)                         |
| [`<uui-card>`](packages/uui-card)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card)                                                 |
| [`<uui-card-content-node>`](packages/uui-card-content-node)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-content-node?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card-content-node)                       |
| [`<uui-card-media>`](packages/uui-card-media)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-media?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card-media)                                     |
| [`<uui-card-user>`](packages/uui-card-user)                                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-user?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card-user)                                       |
| [`<uui-checkbox>`](packages/uui-checkbox)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-checkbox?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-checkbox)                                         |
| [`<uui-color-area>`](packages/uui-color-area)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-area?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-color-area)                                     |
| [`<uui-color-picker>`](packages/uui-color-picker)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-picker?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-color-picker)                                 |
| [`<uui-color-slider>`](packages/uui-color-slider)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-slider?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-color-slider)                                 |
| [`<uui-color-swatch>`](packages/uui-color-swatch)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-swatch?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-color-swatch)                                 |
| [`<uui-color-swatches>`](packages/uui-color-swatches)                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-color-swatches?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-color-swatches)                             |
| [`<uui-combobox>`](packages/uui-combobox)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-combobox?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-combobox)                                         |
| [`<uui-combobox-list>`](packages/uui-combobox-list)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-combobox-list?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-combobox-list)                               |
| [`<uui-dialog>`](packages/uui-dialog)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-dialog?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-dialog)                                             |
| [`<uui-dialog-layout>`](packages/uui-dialog-layout)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-dialog-layout?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-dialog-layout)                               |
| [`<uui-file-dropzone>`](packages/uui-file-dropzone)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-file-dropzone?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-file-dropzone)                               |
| [`<uui-file-preview>`](packages/uui-file-preview)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-file-preview?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-file-preview)                                 |
| [`<uui-form>`](packages/uui-form)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-form?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-form)                                                 |
| [`<uui-form-layout-item>`](packages/uui-form-layout-item)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-form-layout-item?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-form-layout-item)                         |
| [`<uui-form-validation-message>`](packages/uui-form-validation-message)           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-form-validation-message?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-form-validation-message)           |
| [`<uui-icon>`](packages/uui-icon)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-icon)                                                 |
| [`<uui-icon-registry>`](packages/uui-icon-registry)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon-registry?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-icon-registry)                               |
| [`<uui-icon-registry-essential>`](packages/uui-icon-registry-essential)           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon-registry-essential?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-icon-registry-essential)           |
| [`<uui-input>`](packages/uui-input)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input)                                               |
| [`<uui-input-file>`](packages/uui-input-file)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input-file?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input-file)                                     |
| [`<uui-input-lock>`](packages/uui-input-lock)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input-lock?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input-lock)                                     |
| [`<uui-input-password>`](packages/uui-input-password)                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input-password?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input-password)                             |
| [`<uui-keyboard-shortcut>`](packages/uui-keyboard-shortcut)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-keyboard-shortcut?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-keyboard-shortcut)                       |
| [`<uui-label>`](packages/uui-label)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-label?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-label)                                               |
| [`<uui-loader>`](packages/uui-loader)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader)                                             |
| [`<uui-loader-bar>`](packages/uui-loader-bar)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader-bar)                                     |
| [`<uui-loader-circle>`](packages/uui-loader-circle)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-circle?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader-circle)                               |
| [`<uui-menu-item>`](packages/uui-menu-item)                                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-menu-item?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-menu-item)                                       |
| [`<uui-modal>`](packages/uui-modal)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-modal?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-modal)                                               |
| [`<uui-pagination>`](packages/uui-pagination)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-pagination?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-pagination)                                     |
| [`<uui-popover-container>`](packages/uui-popover-container)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-popover-container?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-popover-container)                       |
| [`<uui-progress-bar>`](packages/uui-progress-bar)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-progress-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-progress-bar)                                 |
| [`<uui-range-slider>`](packages/uui-range-slider)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-range-slider?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-range-slider)                                 |
| [`<uui-radio>`](packages/uui-radio)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-radio?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-radio)                                               |
| [`<uui-ref>`](packages/uui-ref)                                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref)                                                   |
| [`<uui-ref-list>`](packages/uui-ref-list)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-list?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-list)                                         |
| [`<uui-ref-node>`](packages/uui-ref-node)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node)                                         |
| [`<uui-ref-node-data-type>`](packages/uui-ref-node-data-type)                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-data-type?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-data-type)                     |
| [`<uui-ref-node-document-type>`](packages/uui-ref-node-document-type)             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-document-type?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-document-type)             |
| [`<uui-ref-node-form>`](packages/uui-ref-node-form)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-form?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-form)                               |
| [`<uui-ref-node-member>`](packages/uui-ref-node-member)                           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-member?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-member)                           |
| [`<uui-ref-node-package>`](packages/uui-ref-node-package)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-package?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-package)                         |
| [`<uui-ref-node-user>`](packages/uui-ref-node-user)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-user?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-user)                               |
| [`<uui-scroll-container>`](packages/uui-scroll-container)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-scroll-container?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-scroll-container)                         |
| [`<uui-select>`](packages/uui-select)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-select?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-select)                                             |
| [`<uui-slider>`](packages/uui-slider)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-slider?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-slider)                                             |
| [`<uui-symbol-expand>`](packages/uui-symbol-expand)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-expand?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-expand)                               |
| [`<uui-symbol-file>`](packages/uui-symbol-file)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-file?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-file)                                   |
| [`<uui-symbol-file-dropzone>`](packages/uui-symbol-file-dropzone)                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-file-dropzone?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-file-dropzone)                 |
| [`<uui-symbol-file-thumbnail>`](packages/uui-symbol-file-thumbnail)               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-file-thumbnail?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-file-thumbnail)               |
| [`<uui-symbol-folder>`](packages/uui-symbol-folder)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-folder?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-folder)                               |
| [`<uui-symbol-lock>`](packages/uui-symbol-lock)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-lock?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-lock)                                   |
| [`<uui-symbol-more>`](packages/uui-symbol-more)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-more?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-more)                                   |
| [`<uui-symbol-sort>`](packages/uui-symbol-sort)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-sort?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-sort)                                   |
| [`<uui-table>`](packages/uui-table)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-table?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-table)                                               |
| [`<uui-tabs>`](packages/uui-tabs)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tabs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tabs)                                                 |
| [`<uui-tag>`](packages/uui-tag)                                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tag?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tag)                                                   |
| [`<uui-textarea>`](packages/uui-textarea)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-textarea?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-textarea)                                         |
| [`<uui-toast-notification>`](packages/uui-toast-notification)                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toast-notification?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toast-notification)                     |
| [`<uui-toast-notification-container>`](packages/uui-toast-notification-container) | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toast-notification-container?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toast-notification-container) |
| [`<uui-toast-notification-layout>`](packages/uui-toast-notification-layout)       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toast-notification-layout?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toast-notification-layout)       |
| [`<uui-toggle>`](packages/uui-toggle)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toggle?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toggle)                                             |
| [`<uui-visually-hidden>`](packages/uui-visually-hidden)                           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-visually-hidden?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-visually-hidden)                           |

## Get started

### Installation

This project uses nodejs, so you should install `nodejs` as the package manager on your machine. See [installation guide](https://nodejs.org/en/). The UI Library requires npm in version 7 or higher, due to the use of npm workspaces.

```sh
git clone https://github.com/umbraco/Umbraco.UI.git
cd .\Umbraco.UI\
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
- Please report bugs and feature requests in the [issue tracker](https://github.com/umbraco/Umbraco.UI/issues)
- The main branch is the latest development branch. Please make your pull requests against this branch: `main`
  - You can see the latest features in the Storybook attached to this branch: [main](https://delightful-beach-055ecb503-main.westeurope.azurestaticapps.net/)
