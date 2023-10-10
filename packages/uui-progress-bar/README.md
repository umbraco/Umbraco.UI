# uui-progress-bar

[![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-progress-bar?logoColor=%231B264F)](https://www.npmjs.com/package/@umbraco-ui/uui-progress-bar)

Umbraco style progress-bar component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-progress-bar--docs)

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-progress-bar
```

Import the registration of `<uui-progress-bar>` via:

```javascript
import '@umbraco-ui/uui-progress-bar';
```

When looking to leverage the `UUIProgressBarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIProgressBarElement } from '@umbraco-ui/uui-progress-bar';
```

## Usage

```html
<uui-progress-bar progress="25"></uui-progress-bar>
```
