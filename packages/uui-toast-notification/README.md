# uui-toast-notification

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-toast-notification?logoColor=%231B264F)

Umbraco style toast-notification component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-toast-notification
```

Import the registration of `<uui-toast-notification>` via:

```javascript
import '@umbraco-ui/uui-toast-notification/lib';
```

When looking to leverage the `UUIToastNotificationElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIToastNotificationElement } from '@umbraco-ui/uui-toast-notification/lib/uui-toast-notification.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-toast-notification@latest/dist/uui-toast-notification.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-toast-notification@X.X.X/dist/uui-toast-notification.min.js"></script>
```

## Usage

```html
<uui-toast-notification></uui-toast-notification>
```
