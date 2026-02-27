# uui-box

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-box?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-box)

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-box--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-box
```

Import the registration of `<uui-box>` via:

```javascript
import '@umbraco-ui/uui-box';
```

When looking to leverage the `UUIBoxElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBoxElement } from '@umbraco-ui/uui-box';
```

## Usage

```html
<uui-box headline="Headline"> Content </uui-box>
```

To specify a headline variant, eg. `h2` then use the `headline-variant` attribute:

```html
<uui-box headline="Headline" headline-variant="h2"> Content </uui-box>
```
