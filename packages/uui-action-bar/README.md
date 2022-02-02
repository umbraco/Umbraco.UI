# uui-action-bar

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-action-bar?logoColor=%231B264F)

Umbraco style action-bar component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-action-bar
```

Import the registration of `<uui-action-bar>` via:

```javascript
import '@umbraco-ui/uui-action-bar';
```

When looking to leverage the `UUIActionBarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIActionBarElement } from '@umbraco-ui/uui-action-bar';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-action-bar@latest/dist/uui-action-bar.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-action-bar@X.X.X/dist/uui-action-bar.min.js"></script>
```

## Usage

```html
<uui-action-bar>
  <uui-button type="button" look="secondary">Button 1</uui-button>
  <uui-button type="button" look="secondary">Button 2</uui-button>
  <uui-button type="button" look="secondary">Button 3</uui-button>
</uui-action-bar>
```
