# ElementInternals ARIA Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move ARIA ownership (role + accessible name) from inner shadow DOM elements to the host custom element via `ElementInternals`, so that `aria-label` on the host is sufficient and no attribute forwarding is needed.

**Architecture:** `LabelMixin` calls `attachInternals()` and syncs `internals.ariaLabel` in `updated()`. Each component sets `internals.role` to declare its ARIA role on the host. Inner native elements (e.g. `<button>`, `<input>`) are hidden from AT via `aria-hidden="true"` and focus is delegated via `delegatesFocus: true` on the shadow root, making the host the canonical interactive element in the accessibility tree.

**Tech Stack:** Lit 3.x, TypeScript, `ElementInternals` / `ARIAMixin` (94%+ browser support, no IE), Vitest + `vitest-browser-lit`, `@vitest/browser-playwright`

---

## Background

In the current architecture, `aria-label` set on a host component (e.g. `<uui-button aria-label="Save">`) does not reach the inner `<button>` that screen readers actually interact with. The v1 fix worked around this by forwarding host attributes to inner elements. For v2, the correct fix is to make the host element the canonical ARIA element, so no forwarding is ever needed.

### Key concepts

- **`attachInternals()`** — called once per element, returns an `ElementInternals` object. Lets you set ARIA properties (`internals.role`, `internals.ariaLabel`, etc.) directly on the host.
- **`internals.role`** — sets the host's ARIA role (e.g. `'button'`, `'textbox'`, `'checkbox'`).
- **`internals.ariaLabel`** — sets the host's accessible name. Takes priority over the inner element's `aria-label`.
- **`delegatesFocus: true`** — set on the shadow root options. When the host receives focus (e.g. via Tab), it's automatically delegated to the first focusable inner element. The host remains the AT target; the inner element handles keyboard input.
- **`aria-hidden="true"`** on inner elements — removes them from the accessibility tree so AT doesn't see two overlapping roles.

### Coordination between `LabelMixin` and `FormControlMixin`

`FormControlMixin` already calls `this.attachInternals()` and stores the result as `this._internals`. `attachInternals()` can only be called once — calling it again throws. The fix: `LabelMixin` calls `attachInternals()` first (it's always earlier in the mixin chain), and `FormControlMixin` checks if `_internals` already exists before calling it.

---

## Affected components

| Component | ARIA role on host | Inner element | `delegatesFocus` needed |
|---|---|---|---|
| `boolean-input` (checkbox, toggle) | `checkbox` / `switch` | `<input type="checkbox">` | yes |
| `input` | `textbox` (varies by type — see Task 4) | `<input>` | yes |
| `button` | `button` or `link` (dynamic on `href`) | `<button>` / `<a>` | yes |
| `color-slider` | `slider` | slider `<div role="slider">` | yes |
| `tab` | `tab` | `<button role="tab">` | yes |
| `menu-item` | `menuitem` | `<div role="menuitem">` | yes |
| `file-dropzone` | `button` | `<input type="file">` | yes |
| `symbol-drag-handle` | `button` | icon element | yes |
| `color-swatch` | `radio` | host is the interactive element | no |
| `color-swatches` | `radiogroup` | — | no |
| `color-picker` | `button` | trigger `<div>` | yes |

---

## Task 1: Update `LabelMixin` — attach internals and sync accessible name

**Files:**
- Modify: `src/internal/mixins/LabelMixin.ts`
- Test: `src/components/checkbox/checkbox.test.ts` (use existing component as proxy)

`LabelMixin` is the shared base for all affected components. All changes here flow automatically to every consumer.

**Step 1: Write the failing test**

Add to `src/components/checkbox/checkbox.test.ts`:

```typescript
it('exposes accessible name via ElementInternals when aria-label is set', async () => {
  const { getByRole } = render(
    html`<uui-checkbox aria-label="Select row"></uui-checkbox>`,
  );
  // The host should be findable by its accessible name without needing a label
  await expect.element(getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

```bash
npm run test:coverage-for checkbox
```
Expected: FAIL — element not found by accessible name "Select row"

**Step 3: Update `LabelMixin`**

```typescript
// src/internal/mixins/LabelMixin.ts

class UUILabelMixinClass extends superClass {
  // Enable focus delegation so Tab focuses inner element but host is AT target
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String })
  public label!: string;

  // Created here so FormControlMixin can reuse it instead of calling attachInternals() again
  protected _internals: ElementInternals = this.attachInternals();

  private _ariaObserver: MutationObserver | undefined;

  connectedCallback() {
    super.connectedCallback();
    this._ariaObserver = new MutationObserver(() => this.requestUpdate());
    this._ariaObserver.observe(this, {
      attributes: true,
      attributeFilter: ['aria-label', 'aria-labelledby'],
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._ariaObserver?.disconnect();
    this._ariaObserver = undefined;
  }

  updated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(_changedProperties);
    this._internals.ariaLabel =
      this.getAttribute('aria-label') || this.label || null;
  }

  firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(_changedProperties);
    if (
      !this.label &&
      !this.getAttribute('aria-label') &&
      !this.getAttribute('aria-labelledby')
    ) {
      console.warn(this.tagName + ' needs a `label`', this);
    }
  }

  // ... renderLabel() unchanged
}
```

**Step 4: Run test to verify it passes**

```bash
npm run test:coverage-for checkbox
```
Expected: PASS

**Step 5: Commit**

```bash
git add src/internal/mixins/LabelMixin.ts src/components/checkbox/checkbox.test.ts
git commit -m "feat(label-mixin): sync accessible name via ElementInternals and enable delegatesFocus"
```

---

## Task 2: Update `FormControlMixin` — guard against double `attachInternals()`

**Files:**
- Modify: `src/internal/mixins/FormControlMixin.ts:173`

`FormControlMixin` currently calls `this.attachInternals()` unconditionally in its constructor. Since `LabelMixin` now calls it first (it's earlier in the mixin chain), `FormControlMixin` must guard against a second call.

**Step 1: Write the failing test**

Add to `src/components/input/input.test.ts`:

```typescript
it('does not throw when both LabelMixin and FormControlMixin are active', async () => {
  // This would throw "attachInternals() already called" before the fix
  await expect(
    render(html`<uui-input label="Search"></uui-input>`).getByRole('textbox'),
  ).resolves.toBeTruthy();
});
```

**Step 2: Run test to verify it fails**

```bash
npm run test:coverage-for input
```
Expected: FAIL or error in console about `attachInternals()` being called twice

**Step 3: Update `FormControlMixin`**

In `src/internal/mixins/FormControlMixin.ts`, find the constructor and guard the call:

```typescript
constructor(...args: any[]) {
  super(...args);
  // LabelMixin may have already called attachInternals() — reuse it if so
  if (!this._internals) {
    this._internals = this.attachInternals();
  }
  // ... rest of constructor unchanged
}
```

**Step 4: Run test to verify it passes**

```bash
npm run test:coverage-for input
```
Expected: PASS

**Step 5: Commit**

```bash
git add src/internal/mixins/FormControlMixin.ts src/components/input/input.test.ts
git commit -m "fix(form-control-mixin): guard against double attachInternals() when used with LabelMixin"
```

---

## Task 3: Update `boolean-input` — set role, hide inner element

**Files:**
- Modify: `src/components/boolean-input/boolean-input.element.ts`
- Test: `src/components/checkbox/checkbox.test.ts`

**Step 1: Write the failing tests**

```typescript
it('host element has checkbox role', async () => {
  const { getByRole } = render(
    html`<uui-checkbox label="Accept"></uui-checkbox>`,
  );
  await expect.element(getByRole('checkbox', { name: 'Accept' })).toBeInTheDocument();
});

it('inner input is hidden from accessibility tree', async () => {
  const { getByRole } = render(
    html`<uui-checkbox label="Accept"></uui-checkbox>`,
  );
  const el = getByRole('checkbox').element() as UUICheckboxElement;
  const inner = el.shadowRoot!.querySelector('#input') as HTMLInputElement;
  expect(inner.getAttribute('aria-hidden')).toBe('true');
});
```

**Step 2: Run tests to verify they fail**

```bash
npm run test:coverage-for checkbox
```

**Step 3: Update `boolean-input.element.ts`**

In the constructor, set the host ARIA role (role varies between checkbox and switch, so it's passed from subclasses):

```typescript
constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
  super();
  this._internals.role = inputRole;  // <-- add this
  // ... rest unchanged
}
```

In `render()`, remove `aria-label` from the inner `<input>` and add `aria-hidden`:

```typescript
<input
  id="input"
  type="checkbox"
  @change="${this._onInputChange}"
  .disabled=${this.disabled || this.readonly}
  .checked=${this.checked}
  .indeterminate=${this.indeterminate}
  aria-checked="${this.checked ? 'true' : 'false'}"
  aria-hidden="true"
  tabindex="-1"
  role="${this.inputRole}" />
```

Note: `tabindex="-1"` because `delegatesFocus: true` handles focus delegation from the host — the inner input doesn't need to be in the tab order itself.

**Step 4: Run tests to verify they pass**

```bash
npm run test:coverage-for checkbox
```

**Step 5: Run full a11y check**

```bash
npm run test:coverage-for checkbox
# verify axeRun passes in existing a11y test
```

**Step 6: Commit**

```bash
git add src/components/boolean-input/boolean-input.element.ts src/components/checkbox/checkbox.test.ts
git commit -m "feat(boolean-input): set internals.role on host and hide inner input from AT"
```

---

## Task 4: Update `input` — set role dynamically from type, hide inner element

**Files:**
- Modify: `src/components/input/input.element.ts`
- Test: `src/components/input/input.test.ts`

The ARIA role of `<uui-input>` depends on its `type` attribute. This mapping must be applied in `updated()`:

| Input type | ARIA role |
|---|---|
| `text`, `email`, `url`, `tel`, `password` | `textbox` |
| `search` | `searchbox` |
| `number` | `spinbutton` |
| `date`, `time`, `datetime-local`, `month`, `week` | `textbox` |
| `color` | `textbox` (no specific ARIA role for color) |

**Step 1: Write the failing test**

```typescript
it('has textbox role by default', async () => {
  const { getByRole } = render(html`<uui-input label="Name"></uui-input>`);
  await expect.element(getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
});

it('has searchbox role when type is search', async () => {
  const { getByRole } = render(
    html`<uui-input type="search" label="Search"></uui-input>`,
  );
  await expect.element(getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
});

it('has spinbutton role when type is number', async () => {
  const { getByRole } = render(
    html`<uui-input type="number" label="Quantity"></uui-input>`,
  );
  await expect.element(getByRole('spinbutton', { name: 'Quantity' })).toBeInTheDocument();
});
```

**Step 2: Run tests to verify they fail**

```bash
npm run test:coverage-for input
```

**Step 3: Add role mapping in `input.element.ts`**

```typescript
private static readonly _roleByType: Partial<Record<InputType, string>> = {
  search: 'searchbox',
  number: 'spinbutton',
};

updated(changedProperties: Map<string | number | symbol, unknown>) {
  super.updated(changedProperties);
  if (changedProperties.has('type')) {
    this._internals.role =
      UUIInputElement._roleByType[this.type as InputType] ?? 'textbox';
  }
}
```

In `render()`, remove `aria-label`/`aria-labelledby` from inner `<input>` and add `aria-hidden`:

```typescript
<input
  ...
  aria-hidden="true"
  tabindex="-1"
  ...
/>
```

**Step 4: Run tests to verify they pass**

```bash
npm run test:coverage-for input
```

**Step 5: Commit**

```bash
git add src/components/input/input.element.ts src/components/input/input.test.ts
git commit -m "feat(input): set internals.role from type and hide inner input from AT"
```

---

## Task 5: Update `button` — dynamic role (button vs link), hide inner element

**Files:**
- Modify: `src/components/button/button.element.ts`
- Test: `src/components/button/button.test.ts`

`uui-button` renders either a `<button>` (default) or an `<a>` (when `href` is set). The host role must reflect this.

**Step 1: Write the failing tests**

```typescript
it('host has button role', async () => {
  const { getByRole } = render(html`<uui-button label="Save"></uui-button>`);
  await expect.element(getByRole('button', { name: 'Save' })).toBeInTheDocument();
});

it('host has link role when href is set', async () => {
  const { getByRole } = render(
    html`<uui-button label="Go" href="/home"></uui-button>`,
  );
  await expect.element(getByRole('link', { name: 'Go' })).toBeInTheDocument();
});

it('does not warn when aria-label is set without label', async () => {
  // icon-only button pattern
  const { getByRole } = render(
    html`<uui-button aria-label="Close dialog"></uui-button>`,
  );
  await expect.element(getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
});
```

**Step 2: Run tests to verify they fail**

```bash
npm run test:coverage-for button
```

**Step 3: Update `button.element.ts`**

Set role in constructor and update in `updated()` when `href` changes:

```typescript
constructor() {
  super();
  this._internals.role = 'button';
}

updated(changedProperties: Map<string | number | symbol, unknown>) {
  super.updated(changedProperties);
  if (changedProperties.has('href')) {
    this._internals.role = this.href ? 'link' : 'button';
  }
}
```

In `render()`, on both `<a>` and `<button>`, remove `aria-label` and add `aria-hidden="true"` + `tabindex="-1"`:

```typescript
// <a> branch:
<a id="button" aria-hidden="true" tabindex="-1" ...>

// <button> branch:
<button id="button" aria-hidden="true" tabindex="-1" ...>
```

**Step 4: Run tests to verify they pass**

```bash
npm run test:coverage-for button
```

**Step 5: Commit**

```bash
git add src/components/button/button.element.ts src/components/button/button.test.ts
git commit -m "feat(button): set internals.role on host (button/link) and hide inner element from AT"
```

---

## Task 6: Update remaining simple components

Handle the remaining `LabelMixin` consumers. Each follows the same pattern: set `internals.role` in the constructor, add `aria-hidden="true"` to the interactive inner element.

**Files:**
- `src/components/color-slider/color-slider.element.ts`
- `src/components/tabs/tab.element.ts`
- `src/components/menu-item/menu-item.element.ts`
- `src/components/file-dropzone/file-dropzone.element.ts`
- `src/components/symbol-drag-handle/symbol-drag-handle.element.ts`

**Roles to set:**

| Component | `internals.role` | Inner element to mark `aria-hidden` |
|---|---|---|
| `color-slider` | `'slider'` | `<div role="slider">` — also set `internals.ariaValueNow` etc. (see below) |
| `tab` | `'tab'` | `<button role="tab">` |
| `menu-item` | `'menuitem'` | `<div role="menuitem">` |
| `file-dropzone` | `'button'` | `<input type="file">` |
| `symbol-drag-handle` | `'button'` | inner icon |

**Special case — `color-slider`:** The slider role requires `aria-valuemin`, `aria-valuemax`, `aria-valuenow`. These must also be synced via `internals`:

```typescript
updated(changedProperties: ...) {
  super.updated(changedProperties);
  this._internals.ariaValueMin = String(this.min);
  this._internals.ariaValueMax = String(this.max);
  this._internals.ariaValueNow = String(this.value);
  this._internals.ariaOrientation = this.vertical ? 'vertical' : 'horizontal';
}
```

**For each component, follow the same TDD pattern as Tasks 3–5:** write failing test → verify fail → implement → verify pass → commit. One commit per component.

---

## Task 7: Update `color-swatch` and `color-swatches`

**Files:**
- `src/components/color-swatch/color-swatch.element.ts`
- `src/components/color-swatches/color-swatches.element.ts`

These are selection components, not interactive controls with inner native elements. The host IS the interactive element.

- `color-swatch` → `internals.role = 'radio'`
- `color-swatches` → `internals.role = 'radiogroup'`

No `aria-hidden` changes needed on inner elements — there are no inner interactive native elements to hide.

Follow TDD pattern, one commit per component.

---

## Task 8: Update `color-picker`

**Files:**
- `src/components/color-picker/color-picker.element.ts`
- `src/components/color-picker/color-picker.test.ts`

`color-picker` is more complex — it has a trigger button that opens a popover with many inner controls. Assess the existing accessible name and role before implementing. The trigger `<div>` currently has `aria-label="${this.label || 'Open Color picker'}"`.

- Host role: `'button'` (the trigger)
- Default accessible name: `this.label || 'Open Color picker'` (preserve fallback)

The `LabelMixin.updated()` sync sets `internals.ariaLabel = this.getAttribute('aria-label') || this.label || null`. The fallback (`'Open Color picker'`) only applies when neither is set. Handle the fallback separately:

```typescript
updated(changedProperties: ...) {
  super.updated(changedProperties); // sets internals.ariaLabel from aria-label or label
  if (!this._internals.ariaLabel) {
    this._internals.ariaLabel = 'Open Color picker';
  }
}
```

Follow TDD pattern, one commit.

---

## Task 9: Clean up forwarding remnants

After all components are updated, the attribute-forwarding approach from the v1 workaround is no longer needed in v2. Verify none of the inner elements still have `aria-label=${...this.label...}` patterns remaining.

**Step 1: Search for forwarding patterns**

```bash
grep -rn "getAttribute('aria-label')\|this\.label.*aria" src/components/ --include="*.element.ts"
```

Expected: no matches (all removed in Tasks 3–8).

**Step 2: Verify tests still pass**

```bash
npm run test
```

**Step 3: Commit if any remaining cleanup was needed**

```bash
git commit -m "chore: remove forwarding remnants — ARIA now owned by host via ElementInternals"
```

---

## Task 10: Full test + a11y audit

**Step 1: Run full test suite**

```bash
npm run test
```
Expected: all tests pass.

**Step 2: Run linter**

```bash
npm run lint
```

**Step 3: Verify a11y tests pass for all changed components**

Each component has an `axeRun` test. Confirm none regressed.

**Step 4: Final commit if needed, then open PR**

Branch from `main`, target `main`. PR title: `feat: move ARIA ownership to host element via ElementInternals`

Reference this plan and the v1 PR (#1333) in the PR body.

---

## Notes for the implementer

- **`attachInternals()` can only be called once.** Task 2 guards `FormControlMixin` — do not skip it or you will get a `DOMException` on any form-control component.
- **`delegatesFocus: true` is set on `shadowRootOptions` in `LabelMixin`.** This is a static class property — it affects all shadow roots of all subclasses. If any component has behaviour that conflicts with focus delegation, it will need to override `shadowRootOptions` to opt out.
- **Do not set `tabindex` on the host.** `delegatesFocus` handles this automatically — the host becomes focusable via Tab without an explicit `tabindex`.
- **The MutationObserver in `LabelMixin` must stay.** It triggers `requestUpdate()` when `aria-label`/`aria-labelledby` change dynamically on the host, which then fires `updated()` to re-sync `internals.ariaLabel`.
- **Test using `getByRole`** with a `name` option — this is the correct way to verify the accessible name is exposed correctly via `ElementInternals`.
