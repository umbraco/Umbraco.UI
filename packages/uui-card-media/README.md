# uui-card-media

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-card-media?logoColor=%231B264F)

Umbraco style card-media component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-card-media
```

Import the registration of `<uui-card-media>` via:

```javascript
import '@umbraco-ui/uui-card-media/define';
```

When looking to leverage the `UUICardMediaElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUICardMediaElement } from '@umbraco-ui/uui-card-media';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-card-media@latest/dist/uui-card-media.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-card-media@X.X.X/dist/uui-card-media.min.js"></script>
```

## Usage

```html
<uui-card-media></uui-card-media>
```
