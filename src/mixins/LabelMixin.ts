import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class LabelMixinInterface {
  label: string;
  protected renderLabel(): TemplateResult;
}

export const LabelMixin = <T extends Constructor<LitElement>>(
  labelName: string | null,
  superClass: T
) => {
  class LabelMixinClass extends superClass {
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
        (e.target as HTMLSlotElement).assignedElements({ flatten: true })
          .length > 0;
    }

    // TODO does this slot must have an ID? It makes it fail the accesibility test within storybook.
    protected renderLabel() {
      return html`
        ${this.labelSlotHasContent === false
          ? html`<span id="label">${this.label}</span>`
          : ''}
        <slot
          id="label"
          name=${labelName ? labelName : ''}
          @slotchange=${this.labelSlotChanged}
        ></slot>
      `;
    }
  }
  return (LabelMixinClass as unknown) as Constructor<LabelMixinInterface> & T;
};
