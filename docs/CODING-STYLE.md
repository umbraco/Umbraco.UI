# UUI Coding Style

## Component file structure

Each component folder uses a **registration file** pattern (inspired by [Shoelace](https://shoelace.style)):

```
button/
├── button.ts              # Registration file (side effect: registers the element)
├── button.element.ts      # Pure class definition (no side effects)
├── button.test.ts         # Tests
├── button.story.ts        # Storybook story
└── README.md
```

### Why this pattern?

1. **No side effects in class files** — `.element.ts` files export pure classes. They can be imported for type checking, subclassing, or testing without triggering `customElements.define()`.

2. **Simpler build** — Rollup's `preserveModules` drops pure re-export barrel files (`index.ts`) from the output. Registration files have a side effect (`defineElement()` call), so Rollup naturally preserves them. This eliminates the need for a glob hack to force-emit barrel entry points.

3. **Better discoverability** — `button.js` is more descriptive than `index.js` in stack traces, import completions, and browser dev tools.

### Filename conventions

- **Filenames** drop the `uui-` prefix: `button.element.ts`, not `uui-button.element.ts`
- **Class names** keep the prefix: `UUIButtonElement`
- **Tag names** keep the prefix: `uui-button`
- **Event files** keep their PascalCase names: `UUICardEvent.ts`

### Registration file anatomy

```typescript
// button/button.ts
import { defineElement } from '../../internal/registration/index.js';
import { UUIButtonElement } from './button.element.js';

export * from './button.element.js';

defineElement('uui-button', UUIButtonElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-button': UUIButtonElement;
  }
}
```

For multi-element folders (e.g. `table/` with 6 elements), one registration file imports and registers all sibling elements.

### `defineElement` function

`defineElement` supports two calling styles:

- **Direct call** (used in registration files): `defineElement('uui-button', UUIButtonElement)`
- **Decorator** (used only in standalone example elements): `@defineElement('uui-button')`

Both are defensive — they check for a valid element name and skip registration if the element is already defined.

## Import conventions

- **Within a component folder**: import from the `.element` file for the class, or from the registration file for side effects
- **Cross-component imports**: import from the registration file (`../button/button.js`) to ensure the element is registered
- **Test files**: must import the registration file at the top (e.g. `import './button.js';`)
