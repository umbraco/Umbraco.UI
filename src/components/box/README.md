# uui-box

Layout container with optional header, headline, and action slots for grouping content.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-box--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-box>` via:

```javascript
import '@umbraco-ui/uui/components/box/box.js';
```

When looking to leverage the `UUIBoxElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIBoxElement } from '@umbraco-ui/uui/components/box/box.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-box headline="Headline"> Content </uui-box>
```

To specify a headline variant, eg. `h2` then use the `headline-variant` attribute:

```html
<uui-box headline="Headline" headline-variant="h2"> Content </uui-box>
```
