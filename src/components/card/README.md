# uui-card

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-card--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-card>` via:

```javascript
import '@umbraco-ui/uui/components/card/card.js';
```

When looking to leverage the `UUICardElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUICardElement } from '@umbraco-ui/uui/components/card/card.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```javascript
import { UUICardElement } from '@umbraco-ui/uui/components/card/card.js';

class MyCardElement extends UUICardElement {}
```
