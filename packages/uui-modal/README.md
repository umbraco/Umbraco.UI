# uui-modal

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-modal?logoColor=%231B264F)

Umbraco style modal component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-modal
```

Import the registration of `<uui-modal>` via:

```javascript
import '@umbraco-ui/uui-modal';
```

When looking to leverage the `UUIModalElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIModalElement } from '@umbraco-ui/uui-modal';
```

## Usage

You need to spin up your own modal that extends the UUIModalElement. Use the `<uui-modal-container>` to host the modals.
