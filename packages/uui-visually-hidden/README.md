# uui-visually-hidden

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-visually-hidden?logoColor=%231B264F)

Umbraco style visually-hidden component.

The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.

According to [The A11Y Project](https://www.a11yproject.com/posts/how-to-hide-content/):

> There are real world situations where visually hiding content may be appropriate, while the content should remain available to assistive technologies, such as screen readers. For instance, hiding a search field's label as a common magnifying glass icon is used in its stead.

Since visually hidden content can receive focus when tabbing, the element will become visible when something inside receives focus. This behavior is intentional, as sighted keyboard user won’t be able to determine where the focus indicator is without it.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-visually-hidden
```

Import the registration of `<uui-visually-hidden>` via:

```javascript
import '@umbraco-ui/uui-visually-hidden';
```

When looking to leverage the `UUIVisuallyHiddenElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIVisuallyHiddenElement } from '@umbraco-ui/uui-visually-hidden';
```

## Usage

```html
<uui-visually-hidden></uui-visually-hidden>
```
