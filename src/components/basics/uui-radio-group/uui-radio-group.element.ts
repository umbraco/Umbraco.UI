import { LitElement, html, css, property, query } from 'lit-element';
import { UUIRadioElement } from '../uui-radio/uui-radio.element';
/**
 *  @element uui-radio-group
 *
 */

//TODO internals and expose a form value
//TODO required
//TODO disabled
//TODO styles - where can i find it
//TODO keyboard nav and focus
//? what types should we allow as a value of that?

export class UUIRadioGroup extends LitElement {
  static styles = [css``];

  static formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
    this.addEventListener('change', this._handleSelect);
  }

  @query('slot') protected slotElement!: HTMLSlotElement;

  private _value: string | null = null;

  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    this._internals.setFormValue(this._value);
  }

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
        this._value = selectedElement.value;
      }
    });

    const filtered = radios.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.uncheck();
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
