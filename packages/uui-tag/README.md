# uui-tag

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-tag?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-tag)

Tag component from Umbraco UI components library.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-tag
```

Import the registration of `<uui-tag>` via:

```javascript
import '@umbraco-ui/uui-tag/define';
```

When looking to leverage the `UUITagElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITagElement } from '@umbraco-ui/uui-tag';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-tag@latest/dist/uui-tag.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-tag@X.X.X/dist/uui-tag.min.js"></script>
```

## Usage

```html
<uui-tag look="primary">Tag 1</uui-tag>
<uui-tag look="secondary">Tag 2</uui-tag>
```
