# uui-icon-registry

Registry component that provides SVG icon data to descendant `<uui-icon>` elements via the DOM tree.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-icon-registry--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-icon-registry>` via:

```javascript
import '@umbraco-ui/uui/components/icon-registry/icon-registry.js';
```

When looking to leverage the `UUIIconRegistryElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIIconRegistryElement } from '@umbraco-ui/uui/components/icon-registry/icon-registry.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-icon-registry>
  <uui-icon name="myIcon"></uui-icon>
</uui-icon-registry>
```

### Custom icon registry

You can extend `UUIIconRegistry` to create a custom icon registry that loads icons on demand:

```javascript
import { UUIIconRegistry } from '@umbraco-ui/uui/components/icon-registry/UUIIconRegistry.js';

class MyIconRegistry extends UUIIconRegistry {
  protected acceptIcon(iconName) {
    const icon = this.provideIcon(iconName);
    // Load and assign SVG data:
    icon.svg = '<svg>...</svg>';
    return true;
  }
}
```
