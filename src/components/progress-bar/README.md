# uui-progress-bar

Umbraco style progress-bar component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-progress-bar--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-progress-bar>` via:

```javascript
import '@umbraco-ui/uui/components/progress-bar/progress-bar.js';
```

When looking to leverage the `UUIProgressBarElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIProgressBarElement } from '@umbraco-ui/uui/components/progress-bar/progress-bar.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-progress-bar progress="25"></uui-progress-bar>
```
