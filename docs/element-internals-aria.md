# ARIA via ElementInternals

This document explains the approach used in UUI v2 for ARIA roles and accessible names. It is aimed at developers who are new to web components or the `ElementInternals` API.

## The problem this solves

When you write:

```html
<uui-button aria-label="Save document"></uui-button>
```

The browser reads `aria-label` on the `<uui-button>` custom element host. Historically, screen readers did not look at the shadow DOM, so they would find the `<uui-button>` but not the `<button>` inside it. The inner `<button>` — the element actually receiving keyboard focus — had no accessible name of its own.

The v1 workaround was to forward `aria-label` from the host attribute into the inner `<button>`:

```typescript
// old approach (v1)
html`<button
  aria-label=${this.getAttribute('aria-label') || this.label}></button>`;
```

This worked, but was brittle: it had to be repeated in every component, broke for dynamic attribute changes, and required a `MutationObserver` to stay in sync.

## The v2 solution: ElementInternals

`ElementInternals` is a browser API that lets a custom element declare its own ARIA semantics directly on the host, without HTML attributes. It is created by calling `attachInternals()` once per element instance.

```typescript
// In LabelMixin (applies to every UUI component)
protected _internals: ElementInternals = this.attachInternals();

updated() {
  // Sync the accessible name from the label property or aria-label attribute
  this._internals.ariaLabel = this.getAttribute('aria-label') || this.label || null;
}
```

Individual components declare their ARIA role:

```typescript
// In UUIButtonElement
constructor() {
  super();
  this._internals.role = 'button';
}
```

The host element is now the canonical ARIA element. Screen readers see a `<uui-button>` with `role="button"` and an accessible name — no forwarding needed.

## delegatesFocus

```typescript
// In LabelMixin
static readonly shadowRootOptions: ShadowRootInit = {
  ...LitElement.shadowRootOptions,
  delegatesFocus: true,
};
```

`delegatesFocus: true` tells the browser: "when this host element receives Tab focus, pass the actual DOM focus to the first focusable element inside the shadow root."

Without this, a Tab press focuses the `<uui-button>` host. With it, focus passes through to the inner `<button>` — which is what actually handles keyboard events (Enter, Space). The host remains the element that screen readers announce; the inner element remains the element that handles input.

## aria-hidden on inner elements

Since the host now owns the ARIA role and accessible name, the inner native elements (inner `<button>`, `<a>`, `<input type="checkbox">`) are hidden from the accessibility tree:

```html
<!-- Inside uui-button shadow DOM -->
<button aria-hidden="true" tabindex="-1">...</button>
```

- `aria-hidden="true"` removes the element from the AT tree so screen readers do not announce it twice (once for the host, once for the inner element)
- `tabindex="-1"` removes it from the browser's natural tab order; `delegatesFocus` handles getting focus there

## attachInternals() can only be called once

`LabelMixin` calls `attachInternals()` and stores the result as `this._internals`. `FormControlMixin` also used to call it — calling it a second time throws a `DOMException`. The fix is a guard:

```typescript
// In FormControlMixin
constructor() {
  super();
  // LabelMixin may have already called attachInternals(). Reuse it.
  if (!this._internals) {
    this._internals = this.attachInternals();
  }
}
```

## ARIA content attributes take precedence over ElementInternals

An important browser rule: if you set `role="button"` directly as an HTML attribute on an element, that overrides `internals.role`. This is why `color-swatches._handleSlotChange()` must not call `swatch.setAttribute('aria-checked', ...)` — that attribute would freeze the checked state and prevent `internals.ariaChecked` from being reflected to screen readers.

## Which components still forward aria-label to the inner element

`uui-input` is the exception: its inner `<input>` still receives `aria-label` forwarded from the host. This is because a text input must remain directly accessible to AT for users to type into it — hiding it with `aria-hidden` would make it unreachable. For text inputs, forwarding and `internals.ariaLabel` coexist.

## Browser support

`ElementInternals` (`attachInternals()`) is supported in all modern browsers (Chrome 84+, Firefox 93+, Safari 16.4+). No polyfill is needed for UUI's target environments.
