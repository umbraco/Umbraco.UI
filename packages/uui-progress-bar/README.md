# uui-progress-bar

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-progress-bar?logoColor=%231B264F)

Umbraco style progress-bar component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-progress-bar
```

Import the registration of `<uui-progress-bar>` via:

```javascript
import '@umbraco-ui/uui-progress-bar/lib';
```

When looking to leverage the `UUIProgressBarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIProgressBarElement } from '@umbraco-ui/uui-progress-bar/lib';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-progress-bar@latest/dist/uui-progress-bar.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-progress-bar@X.X.X/dist/uui-progress-bar.min.js"></script>
```

## Usage

```html
<uui-progress-bar progress="25"></uui-progress-bar>
```
