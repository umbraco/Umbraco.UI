# uui-tag

Tag component from Umbraco UI components library.

## Usage

```zsh
npm i @umbraco-ui/uui-tag
```

Import the registration of `<uui-tag>` via:

```javascript
import '@umbraco-ui/uui-tag/lib';
```

When looking to leverage the `UUITagElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUITagElement } from '@umbraco-ui/uui-tag/lib/uui-tag.element';
```

## Example

```html
<uui-tag look="primary">Tag 1</uui-tag>
<uui-tag look="secondary">Tag 2</uui-tag>
```
