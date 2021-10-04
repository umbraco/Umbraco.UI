# uui-tabs

## Usage

```zsh
npm i @umbraco-ui/uui-tabs
```

Import the registration of `<uui-tab-group>`, `<uui-tab>` via:

```javascript
import '@umbraco-ui/uui-tabs/lib';
```

When looking to leverage the `UUITabGroupElement`, `UUITabElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITabGroupElement } from '@umbraco-ui/uui-tabs/lib/uui-tab-group.element';
import { UUITabElement } from '@umbraco-ui/uui-tabs/lib/uui-tab.element';
```

## Example

```html
  <uui-tab-group>
    <uui-tab>Tab A</uui-tab>
    <uui-tab>Tab B</uui-tab>
    <uui-tab>Tab C</uui-tab>
  </uui-tab-group>
```
