# uui-modal

Umbraco style modal component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-modal--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-modal-dialog>`, `<uui-modal-sidebar>` and `<uui-modal-container>` via:

```javascript
import '@umbraco-ui/uui/components/modal/modal.js';
```

When looking to leverage the `UUIModalDialogElement`, `UUIModalSidebarElement` and `UUIModalContainerElement` base class as a type and/or for extension purposes, do so via:

```javascript
import {
  UUIModalDialogElement,
  UUIModalSidebarElement,
  UUIModalContainerElement,
} from '@umbraco-ui/uui/components/modal/modal.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

You need to spin up your own modal that extends the UUIModalElement. Use the `<uui-modal-container>` to host the modals.
