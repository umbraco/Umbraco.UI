import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class UUILabelMixinInterface {
  /**
   * Label to be used for aria-label and potentially as visual label for some components
   * @type {string}
   * @prop
   * @attr
   */
  label: string;
  protected renderLabel(): TemplateResult;
}

/**
 * This mixin provides label functionality to other components. In the mixed component the label can be provided either via reactive label property, or through slot that this mixin contains. You can style the label template through .label selector.
 *
 * @param {string} labelSlotName - Name that will be assigned for the label slot
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const LabelMixin = <T extends Constructor<LitElement>>(
  labelSlotName: string | null,
  superClass: T,
) => {
  /**
   * Label mixin class containing the label functionality.
   */
  class UUILabelMixinClass extends superClass {
    /**
     * Label to be used for aria-label and potentially as visual label for some components
     * @type {string}
     * @attr
     */
    @property({ type: String })
    public label!: string;

    firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
      super.firstUpdated(_changedProperties);
      if (!this.label) {
        console.warn(this.tagName + ' needs a `label`', this);
      }
    }

    @state()
    private _labelSlotHasContent = false;

    private labelSlotChanged(e: Event): void {
      this._labelSlotHasContent =
        (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length >
        0;
    }

    /**
     * Call in the mixed element to render the label template. It contains a slot. This is optional.
     * @method renderLabel
     * @returns {TemplateResult}
     */
    protected renderLabel() {
      return html`
        ${this._labelSlotHasContent === false
          ? html`<span class="label">${this.label}</span>`
          : ''}
        <slot
          class="label"
          style=${this._labelSlotHasContent ? '' : 'display: none'}
          name=${labelSlotName ? labelSlotName : ''}
          @slotchange=${this.labelSlotChanged}></slot>
      `;
    }
  }
  return UUILabelMixinClass as unknown as Constructor<UUILabelMixinInterface> &
    T;
};

/** @deprecated Use UUILabelMixinInterface instead */
export type LabelMixinInterface = UUILabelMixinInterface;
