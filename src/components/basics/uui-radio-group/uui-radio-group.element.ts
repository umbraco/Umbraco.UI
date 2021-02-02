import {
  LitElement,
  html,
  css,
  property,
  query,
  internalProperty,
} from 'lit-element';
import { UUIRadioElement } from '../uui-radio/uui-radio.element';
/**
 *  @element uui-radio-group
 *
 */

//TODO required
//TODO disabled
//TODO focused style
//TODO keyboard nav and focus
//TODO porogramatically change the value
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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radio-group');
  }

  firstUpdated() {
    this.radioElements[0].setAttribute('tabindex', '0');
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

  @internalProperty()
  selected: number | null = null;

  //how to abstract this method so it's reusable?
  private _handleSelect(e: Event) {
    const radios = this.radioElements;
    let selectedElement: UUIRadioElement;

    radios.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
        // this.selected = radios.findIndex()
        this._value = selectedElement.value;
      }
    });

    const filtered = radios.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.uncheck();
    });
  }

  render() {
    return html` <slot></slot> `;
  }
}
