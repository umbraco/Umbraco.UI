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
<uui-progress-bar label="Upload progress" progress="25"></uui-progress-bar>
```

Use `max` to track progress on a different scale, for example steps:

```html
<uui-progress-bar
  label="Steps completed"
  progress="3"
  max="10"></uui-progress-bar>
```

Use `indeterminate` when the progress can't be measured, and `status` to show that the operation has `finished` or ended in an `error`:

```html
<uui-progress-bar label="Loading content" indeterminate></uui-progress-bar>
<uui-progress-bar
  label="Upload progress"
  progress="100"
  status="finished"></uui-progress-bar>
```

A `label` (or `aria-label`) is required so assistive technologies can name the progress bar.

`status` only changes the colour of the bar. Show a visible message next to it when an operation finishes or fails, and set `aria-busy="true"` on the region that is loading rather than on the progress bar.
