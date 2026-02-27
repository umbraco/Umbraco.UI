# uui-responsive-container

A responsive container that automatically collapses overflowing children into a dropdown menu.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-responsive-container--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-responsive-container>` via:

```javascript
import '@umbraco-ui/uui/components/responsive-container/responsive-container.js';
```

When looking to leverage the `UUIResponsiveContainerElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIResponsiveContainerElement } from '@umbraco-ui/uui/components/responsive-container/responsive-container.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-responsive-container>
  <uui-button>Save</uui-button>
  <uui-button>Edit</uui-button>
  <uui-button>Delete</uui-button>
  <uui-button>Share</uui-button>
</uui-responsive-container>
```

When there's not enough space, items collapse into a "more" dropdown automatically.

## Properties

| Property   | Type                 | Default | Description                    |
| ---------- | -------------------- | ------- | ------------------------------ |
| `collapse` | `'start'` \| `'end'` | `'end'` | Which side items collapse from |

### collapse="end" (default)

Items collapse from the right side. The "more" button appears on the right.

```html
<uui-responsive-container collapse="end">
  <uui-button>First</uui-button>
  <uui-button>Second</uui-button>
  <uui-button>Third</uui-button>
</uui-responsive-container>
```

### collapse="start"

Items collapse from the left side. The "more" button appears on the left.

```html
<uui-responsive-container collapse="start">
  <uui-button>First</uui-button>
  <uui-button>Second</uui-button>
  <uui-button>Third</uui-button>
</uui-responsive-container>
```

## CSS Custom Properties

| Property                         | Default | Description       |
| -------------------------------- | ------- | ----------------- |
| `--uui-responsive-container-gap` | `8px`   | Gap between items |

### Example: Custom Gap

```html
<uui-responsive-container style="--uui-responsive-container-gap: 16px;">
  <uui-button>Save</uui-button>
  <uui-button>Edit</uui-button>
</uui-responsive-container>
```
