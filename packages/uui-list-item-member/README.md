# uui-list-item-member

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-list-item-member?logoColor=%231B264F)

Umbraco style list-item-member component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-list-item-member
```

Import the registration of `<uui-list-item-member>` via:

```javascript
import '@umbraco-ui/uui-list-item-member/lib';
```

When looking to leverage the `UUIListItemMemberElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIListItemMemberElement } from '@umbraco-ui/uui-list-item-member/lib/uui-list-item-member.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-member@latest/dist/uui-list-item-member.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-list-item-member@X.X.X/dist/uui-list-item-member.min.js"></script>
```

## Usage

```html
<uui-list-item-member></uui-list-item-member>
```
