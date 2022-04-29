![UI Library](docs/images/UI.png)

# [Umbraco UI Library](https://uui.umbraco.com/)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE.md) [![Twitter](https://img.shields.io/twitter/follow/umbraco.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=umbraco)

This is a UI-library for [Umbraco CMS](https://umbraco.com/) and friends. It is a collection of user interface components that can be used to build Umbraco style interfaces.

The elements are web components built with [Lit](https://lit.dev/) and are meant to be displayed with [UI Library Storybook](https://uui.umbraco.com/).

The Storybook is also a development environment for the components.

If you want to use a component in your project find it in the table below and follow the instructions from components readme.

If you want to develop a component or contribute to the repository go to ["Get started"](#get-started) section.

## Components

| Component                                                                                                                        | Status                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`uui` bundle package](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui)                                              | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui)                                                           |
| [`uui-css` bundle package](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-css)                                      | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-css?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-css)                                                   |
| [`<uui-action-bar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-action-bar)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-action-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-action-bar)                                     |
| [`<uui-avatar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-avatar)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar)                                             |
| [`<uui-avatar-group>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-avatar-group)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-avatar-group)                                 |
| [`<uui-badge>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-badge)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-badge?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-badge)                                               |
| [`<uui-base>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-base)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-base?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-base)                                                 |
| [`<uui-boolean-input>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-boolean-input)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-boolean-input?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-boolean-input)                               |
| [`<uui-box>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-box)                                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-box?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-box)                                                   |
| [`<uui-breadcrumbs>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-breadcrumbs)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-breadcrumbs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-breadcrumbs)                                   |
| [`<uui-button>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-button)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button)                                             |
| [`<uui-button-group>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-button-group)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-group?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button-group)                                 |
| [`<uui-button-inline-create>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-button-inline-create)                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-inline-create?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-button-inline-create)                 |
| [`<uui-card>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-card)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card)                                                 |
| [`<uui-card-content-node>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-card-content-node)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-content-node?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card-content-node)                       |
| [`<uui-card-media>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-card-media)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-media?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card-media)                                     |
| [`<uui-card-user>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-card-user)                                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-user?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-card-user)                                       |
| [`<uui-caret>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-caret)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-caret?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-caret)                                               |
| [`<uui-checkbox>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-checkbox)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-checkbox?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-checkbox)                                         |
| [`<uui-dialog>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-dialog)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-dialog?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-dialog)                                             |
| [`<uui-dialog-layout>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-dialog-layout)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-dialog-layout?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-dialog-layout)                               |
| [`<uui-file-dropzone>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-file-dropzone)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-file-dropzone?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-file-dropzone)                               |
| [`<uui-file-preview>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-file-preview)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-file-preview?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-file-preview)                                 |
| [`<uui-form>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-form)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-form?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-form)                                                 |
| [`<uui-form-layout-item>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-form-layout-item)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-form-layout-item?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-form-layout-item)                         |
| [`<uui-form-validation-message>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-form-validation-message)           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-form-validation-message?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-form-validation-message)           |
| [`<uui-icon>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-icon)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-icon)                                                 |
| [`<uui-icon-registry>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-icon-registry)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon-registry?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-icon-registry)                               |
| [`<uui-icon-registry-essential>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-icon-registry-essential)           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-icon-registry-essential?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-icon-registry-essential)           |
| [`<uui-input>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-input)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input)                                               |
| [`<uui-input-file>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-input-file)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input-file?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input-file)                                     |
| [`<uui-input-lock>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-input-lock)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input-lock?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input-lock)                                     |
| [`<uui-input-password>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-input-password)                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input-password?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-input-password)                             |
| [`<uui-keyboard-shortcut>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-keyboard-shortcut)                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-keyboard-shortcut?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-keyboard-shortcut)                       |
| [`<uui-label>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-label)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-label?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-label)                                               |
| [`<uui-loader>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader)                                             |
| [`<uui-loader-bar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader-bar)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader-bar)                                     |
| [`<uui-loader-circle>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader-circle)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-circle?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-loader-circle)                               |
| [`<uui-menu-item>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-menu-item)                                       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-menu-item?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-menu-item)                                       |
| [`<uui-pagination>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-pagination)                                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-pagination?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-pagination)                                     |
| [`<uui-popover>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-popover)                                           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-popover?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-popover)                                           |
| [`<uui-progress-bar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-progress-bar)                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-progress-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-progress-bar)                                 |
| [`<uui-radio>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-radio)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-radio?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-radio)                                               |
| [`<uui-ref>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref)                                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref)                                                   |
| [`<uui-ref-list>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-list)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-list?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-list)                                         |
| [`<uui-ref-node>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-node)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node)                                         |
| [`<uui-ref-node-data-type>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-node-data-type)                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-data-type?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-data-type)                     |
| [`<uui-ref-node-document-type>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-node-document-type)             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-document-type?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-document-type)             |
| [`<uui-ref-node-form>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-node-form)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-form?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-form)                               |
| [`<uui-ref-node-member>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-node-member)                           | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-member?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-member)                           |
| [`<uui-ref-node-package>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-node-package)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-package?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-package)                         |
| [`<uui-ref-node-user>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-ref-node-user)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-ref-node-user?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-ref-node-user)                               |
| [`<uui-scroll-container>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-scroll-container)                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-scroll-container?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-scroll-container)                         |
| [`<uui-select>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-select)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-select?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-select)                                             |
| [`<uui-slider>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-slider)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-slider?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-slider)                                             |
| [`<uui-symbol-expand>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-expand)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-expand?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-expand)                               |
| [`<uui-symbol-file>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-file)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-file?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-file)                                   |
| [`<uui-symbol-file-dropzone>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-file-dropzone)                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-file-dropzone?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-file-dropzone)                 |
| [`<uui-symbol-file-thumbnail>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-file-thumbnail)               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-file-thumbnail?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-file-thumbnail)               |
| [`<uui-symbol-folder>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-folder)                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-folder?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-folder)                               |
| [`<uui-symbol-lock>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-lock)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-lock?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-lock)                                   |
| [`<uui-symbol-more>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-more)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-more?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-more)                                   |
| [`<uui-symbol-sort>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-symbol-sort)                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-symbol-sort?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-symbol-sort)                                   |
| [`<uui-table>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-table)                                               | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-table?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-table)                                               |
| [`<uui-tabs>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-tabs)                                                 | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tabs?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tabs)                                                 |
| [`<uui-tag>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-tag)                                                   | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tag?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tag)                                                   |
| [`<uui-textarea>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-textarea)                                         | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-textarea?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-textarea)                                         |
| [`<uui-toast-notification>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-toast-notification)                     | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toast-notification?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toast-notification)                     |
| [`<uui-toast-notification-container>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-toast-notification-container) | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toast-notification-container?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toast-notification-container) |
| [`<uui-toast-notification-layout>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-toast-notification-layout)       | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toast-notification-layout?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toast-notification-layout)       |
| [`<uui-toggle>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-toggle)                                             | [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toggle?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-toggle)                                             |

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
