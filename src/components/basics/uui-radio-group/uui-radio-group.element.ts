import { LitElement, html, css, property, query } from 'lit-element';
import { UUIRadioElement } from '../uui-radio/uui-radio.element';
/**
 *  @element uui-radio-group
 *
 */

//TODO internals and expose a form value
//TODO styles - where can i find it
//TODO keyboard nav and focus

export class UUIRadioGroup extends LitElement {
  static styles = [css``];

  constructor() {
    super();
    this.addEventListener('change', this._handleSelect);
  }

  @query('slot') protected slotElement!: HTMLSlotElement;

  protected get radioElements(): UUIRadioElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(el => el instanceof UUIRadioElement) as UUIRadioElement[])
      : [];
  }

  //how to abstract this method so it's reusable?
  private _handleSelect(e: Event) {
    const radios = this.radioElements;
    let selectedElement: UUIRadioElement;

    radios.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
      }
    });

    const filtered = radios.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.removeAttribute('checked');
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
