# uui-avatar

## Usage

```zsh
npm i @umbraco-ui/uui-box
```

Import the registration of `<uui-box>` via:

```javascript
import '@umbraco-ui/uui-box/lib';
```

When looking to leverage the `UUIBoxElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBoxElement } from '@umbraco-ui/uui-box/lib/uui-box.element';
```

## Example

```html
<uui-box>
  <div slot="header">Header</div>
  <div slot="main">Main</main>
</uui-box>
```
