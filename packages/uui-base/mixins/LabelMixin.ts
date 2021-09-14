import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class LabelMixinInterface {
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
  superClass: T
) => {
  class LabelMixinClass extends superClass {
    /**
     * Text with which component should be labeled
     * @type {string}
     * @attr
     */
    @property({ type: String })
    public label!: string;

    connectedCallback() {
      super.connectedCallback();
      if (!this.label) {
        console.warn(this.tagName + ' needs a `label`');
      }
    }

    @state()
    private labelSlotHasContent = false;

    private labelSlotChanged(e: any): void {
      this.labelSlotHasContent =
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
        ${this.labelSlotHasContent === false
          ? html`<span class="label">${this.label}</span>`
          : ''}
        <slot
          class="label"
          style=${this.labelSlotHasContent ? '' : 'visibility: hidden'}
          name=${labelSlotName ? labelSlotName : ''}
          @slotchange=${this.labelSlotChanged}></slot>
      `;
    }
  }
  return LabelMixinClass as unknown as Constructor<LabelMixinInterface> & T;
};
