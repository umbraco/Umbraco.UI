![UI Library](docs/images/UI.png)

# [Umbraco UI Library](https://uui.umbraco.com/)

[![Build](https://github.com/umbraco/Umbraco.UI/actions/workflows/tests.yml/badge.svg)](https://github.com/umbraco/Umbraco.UI/actions/workflows/tests.yml) [![Storybook build](https://github.com/umbraco/Umbraco.UI/actions/workflows/azure-static-web-apps-delightful-beach-055ecb503.yml/badge.svg)](https://github.com/umbraco/Umbraco.UI/actions/workflows/azure-static-web-apps-delightful-beach-055ecb503.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=umbraco_Umbraco.UI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=umbraco_Umbraco.UI) [![npm](https://img.shields.io/npm/v/@umbraco-ui/uui?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

A collection of 80+ web components for building [Umbraco CMS](https://umbraco.com/) interfaces. Built with [Lit](https://lit.dev/) and TypeScript. Browse them in the [Storybook](https://uui.umbraco.com/).

## Installation

```sh
npm install @umbraco-ui/uui
```

**Requirements:** Node >= 24.13, npm >= 11. Runtime dependency: [Lit](https://lit.dev/) ^3.0.0.

## Quick start

Import only the components you need — your bundler will tree-shake the rest:

```js
import '@umbraco-ui/uui/components/button/button.js';
import '@umbraco-ui/uui/components/input/input.js';
```

```html
<uui-button look="primary" label="Save"></uui-button>
<uui-input label="Name"></uui-input>
```

Or register everything at once with `import '@umbraco-ui/uui';`.

Include a theme for CSS custom properties:

```html
<link
  rel="stylesheet"
  href="node_modules/@umbraco-ui/uui/dist/themes/light.css" />
```

No bundler? Use UUI directly in the browser via [import maps](docs/USAGE-WITHOUT-BUNDLER.md).

## Components

80+ components across 13 categories: Buttons, Inputs, Color, Cards, Refs, Feedback, Layout, Forms, Navigation, Icons, Files, Symbols, and Data.

Each component has its own README in [`src/components/{name}/`](src/components/).

- [Browse in Storybook](https://uui.umbraco.com/)
- [Full component list](docs/COMPONENTS.md)

## Documentation

### Guides

| Document                                                 | Description                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Migration v1 to v2](docs/MIGRATION-V1-TO-V2.md)         | Moving from the multi-package monorepo to the single `@umbraco-ui/uui` package |
| [Usage without a bundler](docs/USAGE-WITHOUT-BUNDLER.md) | Using UUI via import maps and CDN                                              |
| [Testing with npm link](docs/TESTING-WITH-NPM-LINK.md)   | Live-testing local UUI changes in a consuming project                          |

### Development references

| Document                                            | Description                                                |
| --------------------------------------------------- | ---------------------------------------------------------- |
| [Contributing](docs/CONTRIBUTING.md)                | How to contribute, PR guidelines, and code ownership       |
| [Coding style](docs/CODING-STYLE.md)                | Component file structure, naming conventions, and patterns |
| [Scripts](docs/SCRIPTS.md)                          | Full reference for all npm scripts                         |
| [Events](docs/EVENTS.md)                            | Custom event types, bubbling, and composed behavior        |
| [Component list](docs/COMPONENTS.md)                | All components with status                                 |
| [Release instructions](docs/RELEASE_INSTRUCTION.md) | Publishing workflow for maintainers                        |

## Development

### Setup

Requires Node.js >= 24.13 (see `.nvmrc`) and npm >= 11.

```sh
git clone https://github.com/umbraco/Umbraco.UI.git
cd Umbraco.UI
npm install
```

### Key commands

| Command                            | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| `npm run storybook`                | Start Storybook dev server on port 6006            |
| `npm run build`                    | Build the library (Vite + TypeScript declarations) |
| `npm run test`                     | Run all tests with coverage                        |
| `npm run test:coverage-for button` | Run tests for a single component                   |
| `npm run lint`                     | Lint with ESLint                                   |
| `npm run format`                   | Auto-fix lint and formatting                       |

See [docs/SCRIPTS.md](docs/SCRIPTS.md) for the full list.

### Project structure

```
src/
├── internal/     # Mixins, events, types, registration
├── styles/       # CSS custom properties and text styles
├── themes/       # Light and dark theme CSS
├── components/   # 80+ component directories
└── index.ts      # Barrel — re-exports everything
```

### Branching model

- **`main`** — development branch, PR target
- **`production`** — published release, serves Storybook at [uui.umbraco.com](https://uui.umbraco.com)
- **`release/*`** — intermediary releases (RCs)

## Contributing

Pull requests and stars are always welcome. Read the [contributing guide](docs/CONTRIBUTING.md) to get started.

Report bugs and feature requests in the [issue tracker](https://github.com/umbraco/Umbraco.UI/issues).

## License

[MIT](LICENSE.md)
