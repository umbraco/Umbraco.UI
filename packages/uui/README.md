# uui

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui?logoColor=%231B264F)

The full Umbraco UI Library. The package includes and registers all UUI Web Components.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui
```

Import the registration of all `uui` web components via:

```javascript
import '@umbraco-ui/uui/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui@latest/dist/uui.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui@X.X.X/dist/uui.min.js"></script>
```

### Included components

| Component                                                                                                  | Status                                                                                     |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`<uui-avatar-group>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-avatar-group)           | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar-group?logoColor=%231B264F)      |
| [`<uui-avatar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-avatar)                       | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-avatar?logoColor=%231B264F)            |
| [`<uui-badge>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-badge)                         | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-badge?logoColor=%231B264F)             |
| [`uui-base`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-base)                             | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-base?logoColor=%231B264F)              |
| [`<uui-box>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-box)                             | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-box?logoColor=%231B264F)               |
| [`<uui-breadcrumbs>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-breadcrumbs)             | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-breadcrumbs?logoColor=%231B264F)       |
| [`<uui-button>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-button)                       | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button?logoColor=%231B264F)            |
| [`<uui-button-group>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-button-group)           | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-button-group?logoColor=%231B264F)      |
| [`<uui-checkbox>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-checkbox)                   | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-checkbox?logoColor=%231B264F)          |
| [`<uui-input>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-input)                         | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-input?logoColor=%231B264F)             |
| [`<uui-keyboard-shortcut>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-keyboard-shortcut) | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-keyboard-shortcut?logoColor=%231B264F) |
| [`<uui-loader>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader)                       | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader?logoColor=%231B264F)            |
| [`<uui-loader-bar>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader-bar)               | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-bar?logoColor=%231B264F)        |
| [`<uui-loader-circle>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-loader-circle)         | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-loader-circle?logoColor=%231B264F)     |
| [`<uui-radio>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-radio)                         | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-radio?logoColor=%231B264F)             |
| [`<uui-slider>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-slider)                       | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-slider?logoColor=%231B264F)            |
| [`<uui-table>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-table)                         | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-table?logoColor=%231B264F)             |
| [`<uui-tabs>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-tabs)                           | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tabs?logoColor=%231B264F)              |
| [`<uui-tag>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-tag)                             | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tag?logoColor=%231B264F)               |
| [`<uui-toggle>`](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui-toggle)                       | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toggle?logoColor=%231B264F)            |
| [`uui` bundle package](https://github.com/umbraco/Umbraco.UI/tree/dev/packages/uui)                        | ![npm](https://img.shields.io/npm/v/@umbraco-ui/uui?logoColor=%231B264F)                   |
