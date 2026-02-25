![UI Library](docs/images/UI.png)

# [Umbraco UI Library](https://uui.umbraco.com/)

[![Build](https://github.com/umbraco/Umbraco.UI/actions/workflows/tests.yml/badge.svg)](https://github.com/umbraco/Umbraco.UI/actions/workflows/tests.yml) [![Storybook build](https://github.com/umbraco/Umbraco.UI/actions/workflows/azure-static-web-apps-delightful-beach-055ecb503.yml/badge.svg)](https://github.com/umbraco/Umbraco.UI/actions/workflows/azure-static-web-apps-delightful-beach-055ecb503.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=umbraco_Umbraco.UI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=umbraco_Umbraco.UI) [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

The Umbraco UI Library is a collection of web components for building [Umbraco CMS](https://umbraco.com/) style interfaces. Built with [Lit](https://lit.dev/) and TypeScript, the library provides 80+ components — buttons, inputs, dialogs, cards, tables, and more.

Browse the components in the [Storybook](https://uui.umbraco.com/).

## Installation

```sh
npm install @umbraco-ui/uui
```

**Requirements:** Node >= 24.13, npm >= 11. The only runtime dependency is [Lit](https://lit.dev/) ^3.0.0.

## Usage

### Import what you need

Each component is a separate ES module. Import only the components you use — your bundler will tree-shake the rest:

```js
import '@umbraco-ui/uui/components/button/index.js';
import '@umbraco-ui/uui/components/input/index.js';
```

```html
<uui-button look="primary" label="Save"></uui-button>
<uui-input label="Name"></uui-input>
```

### Import everything

To register all components at once:

```js
import '@umbraco-ui/uui';
```

### Theming

Include a theme stylesheet for CSS custom properties:

```html
<link
  rel="stylesheet"
  href="node_modules/@umbraco-ui/uui/dist/themes/light.css" />
```

Or import it in your JS/CSS bundler setup.

### Using without a bundler

You can use UUI directly in the browser via [import maps](docs/USAGE-WITHOUT-BUNDLER.md) — no build step required.

## Migrating from v1

In v1, each component was a separate npm package (`@umbraco-ui/uui-button`, `@umbraco-ui/uui-input`, etc.). In v2, everything is published as a single `@umbraco-ui/uui` package.

See the [Migration Guide](docs/MIGRATION-V1-TO-V2.md) for step-by-step instructions.

## Components

80 components across these categories:

| Category       | Components                                                                                                                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Buttons**    | `uui-button`, `uui-button-group`, `uui-button-inline-create`, `uui-button-copy-text`                                                                                                                                  |
| **Inputs**     | `uui-input`, `uui-input-password`, `uui-input-lock`, `uui-input-file`, `uui-textarea`, `uui-select`, `uui-checkbox`, `uui-toggle`, `uui-radio`, `uui-slider`, `uui-range-slider`, `uui-combobox`, `uui-combobox-list` |
| **Color**      | `uui-color-area`, `uui-color-slider`, `uui-color-swatch`, `uui-color-swatches`, `uui-color-picker`                                                                                                                    |
| **Cards**      | `uui-card`, `uui-card-block-type`, `uui-card-content-node`, `uui-card-media`, `uui-card-user`                                                                                                                         |
| **Refs**       | `uui-ref`, `uui-ref-list`, `uui-ref-node`, `uui-ref-node-data-type`, `uui-ref-node-document-type`, `uui-ref-node-form`, `uui-ref-node-member`, `uui-ref-node-package`, `uui-ref-node-user`                            |
| **Feedback**   | `uui-badge`, `uui-tag`, `uui-loader`, `uui-loader-bar`, `uui-loader-circle`, `uui-progress-bar`, `uui-toast-notification`, `uui-toast-notification-container`, `uui-toast-notification-layout`                        |
| **Layout**     | `uui-box`, `uui-dialog`, `uui-dialog-layout`, `uui-modal`, `uui-popover-container`, `uui-scroll-container`, `uui-responsive-container`, `uui-tabs`                                                                    |
| **Forms**      | `uui-form`, `uui-form-layout-item`, `uui-form-validation-message`, `uui-label`, `uui-boolean-input`                                                                                                                   |
| **Navigation** | `uui-breadcrumbs`, `uui-menu-item`, `uui-pagination`                                                                                                                                                                  |
| **Icons**      | `uui-icon`, `uui-icon-registry`, `uui-icon-registry-essential`                                                                                                                                                        |
| **Files**      | `uui-file-dropzone`, `uui-file-preview`, `uui-symbol-file`, `uui-symbol-file-dropzone`, `uui-symbol-file-thumbnail`, `uui-symbol-folder`                                                                              |
| **Symbols**    | `uui-symbol-expand`, `uui-symbol-lock`, `uui-symbol-more`, `uui-symbol-sort`                                                                                                                                          |
| **Data**       | `uui-table`, `uui-avatar`, `uui-avatar-group`, `uui-keyboard-shortcut`, `uui-visually-hidden`                                                                                                                         |

Each component has its own README in [`src/components/{name}/`](src/components/).

## Development

### Prerequisites

- Node.js >= 24.13 (see `.nvmrc`)
- npm >= 11

### Setup

```sh
git clone https://github.com/umbraco/Umbraco.UI.git
cd Umbraco.UI
npm install
```

### Commands

| Command                            | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| `npm run storybook`                | Start Storybook dev server on port 6006            |
| `npm run build`                    | Build the library (Vite + TypeScript declarations) |
| `npm run build:watch`              | Rebuild on source changes (no type declarations)   |
| `npm run test`                     | Run all component tests with coverage              |
| `npm run test:watch`               | Run tests in watch mode                            |
| `npm run test:coverage-for button` | Run tests for a single component                   |
| `npm run lint`                     | Lint with ESLint                                   |
| `npm run format`                   | Auto-fix lint and formatting                       |
| `npm run new-component`            | Scaffold a new component (interactive)             |

### Project structure

```
src/
├── internal/        # Foundation: mixins, events, types, registration
├── styles/          # Design system CSS custom properties and text styles
├── themes/          # Light and dark theme CSS
├── components/      # 80 component directories
│   ├── button/
│   │   ├── index.ts
│   │   ├── uui-button.element.ts
│   │   ├── uui-button.test.ts
│   │   ├── uui-button.story.ts
│   │   └── README.md
│   ├── input/
│   └── ...
└── index.ts         # Barrel — re-exports everything
```

### Testing locally in another project

Use `npm link` and `build:watch` to test UUI changes live in a consuming project (e.g. the Umbraco backoffice). See the [npm link guide](docs/TESTING-WITH-NPM-LINK.md) for instructions.

### Branching model

- **`main`** — primary development branch, PR target
- **`production`** — published release, serves Storybook at [uui.umbraco.com](https://uui.umbraco.com)
- **`release/*`** — intermediary releases (RCs)

## Contributing

Pull requests and stars are always welcome. Read the [contributing guide](docs/CONTRIBUTING.md) to get started.

Please report bugs and feature requests in the [issue tracker](https://github.com/umbraco/Umbraco.UI/issues).
