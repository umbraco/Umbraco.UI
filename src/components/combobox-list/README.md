# uui-combobox-list

Umbraco style combobox-list component.

### See it in action

Preview the component on [Storybook](https://uui.umbraco.com/?path=/docs/uui-combobox-list--docs)

## Installation

```zsh
npm i @umbraco-ui/uui
```

Import the registration of `<uui-combobox-list-option>` and `<uui-combobox-list>` via:

```javascript
import '@umbraco-ui/uui/components/combobox-list/combobox-list.js';
```

When looking to leverage the `UUIComboboxListOptionElement` and `UUIComboboxListElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIComboboxListOptionElement, UUIComboboxListElement } from '@umbraco-ui/uui/components/combobox-list/combobox-list.js';
```

Alternatively, if you have already imported the full library, the element will be registered automatically:

```javascript
import '@umbraco-ui/uui';
```

## Usage

```html
<uui-combobox-list></uui-combobox-list>
```
