import { noChange, nothing } from 'lit';
import type { ElementPart } from 'lit';
import { directive, Directive, PartInfo, PartType } from 'lit/directive.js';

/**
 * The directive applies attributes to disable known and commonly used password managers on the given element.
 */
class UUIDisablePasswordManagersDirective extends Directive {
  protected attributes = [
    { name: 'data-1p-ignore', value: '' }, // 1Password
    { name: 'data-bwignore', value: '' }, // Bitwarden
    { name: 'data-form-type', value: 'other' }, // Dashlane
    { name: 'data-lpignore', value: 'true' }, // LastPass
  ];

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type != PartType.ELEMENT) {
      throw new Error(
        'The `uuiIgnorePasswordManagers` directive can only be used in element parts',
      );
    }
  }

  /**
   * The directive does not render any content, it only applies attributes to the element. Therefore, it returns `nothing` and `noChange` in the update method to prevent any unnecessary DOM updates.
   * @returns `nothing` to indicate that the directive does not render any content.
   */
  override render() {
    return nothing;
  }

  /**
   * Applies the password manager ignore attributes to the element. This method is called whenever the directive is used in a template. It iterates over the predefined attributes and sets them on the element using `setAttribute`. After applying the attributes, it returns `noChange` to indicate that no further updates are needed for this part.
   * @param part - The part of the template where the directive is applied, which is expected to be an element part.
   * @returns `noChange` to indicate that no further updates are needed for this part.
   */
  override update(part: ElementPart) {
    this.attributes.forEach(attr => {
      part.element.setAttribute(attr.name, attr.value);
    });
    return noChange;
  }
}

/**
 * A Lit directive which applies attributes to disable known and commonly used password managers on an element.
 * Currently, it supports disabling 1Password, Bitwarden, Dashlane, and LastPass by setting the appropriate attributes that these password managers recognize to exclude the element from their functionality.
 * @example html`<div ${uuiDisablePasswordManagers()}></div>`
 */
export const uuiDisablePasswordManagers = directive(
  UUIDisablePasswordManagersDirective,
);
