import { property } from '@lit/reactive-element/decorators/property';
import { LitElement } from 'lit';

export const SelectableComponent = (
  superClass: typeof LitElement = LitElement
) => {
  class SelectableComponent extends superClass {
    @property({ type: Boolean, reflect: true })
    public selected = false;
  }
  return SelectableComponent;
};
