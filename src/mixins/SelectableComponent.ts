import { property } from '@lit/reactive-element/decorators/property';
import { LitElement } from 'lit';

export const SelectableComponent = (superClass: typeof LitElement) => {
  class SelectableComponent extends superClass {
    static get properties() {
      return {
        ...super.properties,
        selected: { type: Boolean, reflect: true },
      };
    }
    @property({ type: Boolean, reflect: true })
    public selected = false;
  }
  return SelectableComponent;
};
