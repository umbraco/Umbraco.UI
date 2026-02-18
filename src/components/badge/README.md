# uui-badge

Badge component for displaying counts or status indicators.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-badge--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-badge>` via:

```javascript
import '@umbraco-ui/uui/components/badge/uui-badge.element.js';
```

When looking to leverage the `UUIBadgeElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBadgeElement } from '@umbraco-ui/uui/components/badge/uui-badge.element.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-badge color="danger">!</uui-badge>
```
