# Exports reference

Non-component exports available from `@umbraco-ui/uui`.

## `UUI_VERSION`

The package version is exported as a named constant:

```js
import { UUI_VERSION } from '@umbraco-ui/uui';

console.log(UUI_VERSION); // e.g. "2.0.0"
```

### Multiple-instance detection

When UUI loads, it appends its version to `globalThis.__uuiVersions`. If more than one copy of UUI is present in the page (e.g. duplicate bundles or mismatched versions), a `console.warn` is emitted automatically:

```
Multiple versions of Umbraco UI detected: 2.0.0, 2.1.0. This is not supported and may cause issues.
```

You can inspect the array directly for diagnostics:

```js
console.log(globalThis.__uuiVersions); // e.g. ["2.0.0"]
```
