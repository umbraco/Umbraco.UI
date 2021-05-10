import { html, LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators';

export const LabelComponent = (
  labelName: string | null,
  superClass: typeof LitElement
) => {
  class LabelComponent extends superClass {
    @property({ type: String })
    public label!: string;

    /** TODO: investigate what we can do to ensure that firstUpdated does get called, someone might overwrite but forget to call super. */
    firstUpdated(_changedProperties: PropertyValues) {
      super.firstUpdated(_changedProperties);
      if (!this.label) {
        console.warn(this.tagName + ' needs a `label`');
      }
    }

    @state()
    private labelSlotHasContent = false;

    private labelSlotChanged(e: any): void {
      this.labelSlotHasContent =
        (e.target as HTMLSlotElement).assignedElements({ flatten: true })
          .length > 0;
    }

    protected renderLabel() {
      return html`
        ${this.labelSlotHasContent === false ? this.label : ''}
        <slot
          name=${labelName ? labelName : ''}
          @slotchange=${this.labelSlotChanged}
        ></slot>
      `;
    }
  }
  return LabelComponent;
};
