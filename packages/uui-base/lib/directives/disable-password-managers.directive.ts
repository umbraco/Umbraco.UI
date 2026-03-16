import { noChange, nothing } from 'lit';
import type { ElementPart } from 'lit';
import {
  directive,
  Directive,
  type DirectiveParameters,
  PartInfo,
  PartType,
} from 'lit/directive.js';

/**
 * The directive applies or removes attributes to disable known and commonly used password managers on the given element.
 *
 * The `attributes` field is `protected` and `readonly` to allow subclasses to extend the list of
 * managed attributes without replacing the base implementation. Each entry must have a `name` and `value`
 * that together signal to a password manager that it should ignore the element.
 *
 * To add support for additional password managers, subclass and redeclare `attributes` with the
 * full list (base entries + any new ones):
 * @example
 * ```ts
 * class MyDirective extends UUIDisablePasswordManagersDirective {
 *   protected override readonly attributes = [
 *     { name: 'data-1p-ignore', value: '' },
 *     { name: 'data-bwignore', value: '' },
 *     { name: 'data-form-type', value: 'other' },
 *     { name: 'data-lpignore', value: 'true' },
 *     { name: 'data-custom-ignore', value: 'true' }, // additional manager
 *   ];
 * }
 * export const myDisablePasswordManagers = directive(MyDirective);
 * ```
 */
export class UUIDisablePasswordManagersDirective extends Directive {
  /**
   * The list of attributes to apply or remove on the target element.
   * Override this in a subclass to extend support for additional password managers.
   */
  protected readonly attributes = [
    { name: 'data-1p-ignore', value: '' }, // 1Password
    { name: 'data-bwignore', value: '' }, // Bitwarden
    { name: 'data-form-type', value: 'other' }, // Dashlane
    { name: 'data-lpignore', value: 'true' }, // LastPass
  ];

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error(
        'The `uuiDisablePasswordManagers` directive can only be used in element parts',
      );
    }
  }

  /**
   * The directive does not render any content.
   * @returns `nothing` to indicate that the directive does not render any content.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override render(_enabled: boolean) {
    return nothing;
  }

  /**
   * Applies or removes password manager ignore attributes on the element depending on `enabled`.
   * Calling with `false` removes all managed attributes so toggling the property is fully reversible.
   * @param part - The element part where the directive is applied.
   * @param enabled - When `true`, sets the ignore attributes; when `false`, removes them.
   * @returns `noChange` to indicate that no further updates are needed for this part.
   */
  override update(part: ElementPart, [enabled]: DirectiveParameters<this>) {
    this.attributes.forEach(attr => {
      if (enabled) {
        part.element.setAttribute(attr.name, attr.value);
      } else {
        part.element.removeAttribute(attr.name);
      }
    });
    return noChange;
  }
}

/**
 * A Lit directive which applies or removes attributes to disable known and commonly used password managers on an element.
 * Currently supports 1Password, Bitwarden, Dashlane, and LastPass.
 *
 * Pass `true` to suppress password manager behaviour; pass `false` (or toggle back) to restore it.
 * The directive is fully reversible: switching from `true` to `false` removes all managed attributes.
 *
 * @example html`<input ${uuiDisablePasswordManagers(this.disablePasswordManagers)} />`
 */
export const uuiDisablePasswordManagers = directive(
  UUIDisablePasswordManagersDirective,
);
