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
 *  @slot for uui-radio elements
 */

//TODO required?
//TODO proper form and test either here or in the children
//TODO focused style

//fix the disabled selected

//? what types should we allow as a value of that?

const ARROW_LEFT = 'ArrowLeft';
const ARROW_UP = 'ArrowUp';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_DOWN = 'ArrowDown';
const SPACE = ' ';

export class UUIRadioGroup extends LitElement {
  static styles = [css``];

  static formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
    this.addEventListener('change', this._handleSelectOnClick);
    this.addEventListener('keydown', this._onKeydown);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
  }

  firstUpdated() {
    if (this.radioElements.length > 0)
      this.radioElements[0].setAttribute('tabindex', '0');
    this._addNameToRadios(this.name);
    if (this.disabled) this._toggleDisableOnChildren(true);
  }

  @query('slot') protected slotElement!: HTMLSlotElement;

  protected get radioElements(): UUIRadioElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(el => el instanceof UUIRadioElement) as UUIRadioElement[])
      : [];
  }

  protected get enabledRadioElements(): UUIRadioElement[] {
    return this.radioElements.filter(el => !el.disabled);
  }

  private _addNameToRadios(name: string) {
    this.radioElements.forEach(el => (el.name = name));
  }

  //i feel like i'm reapating myself with putting everything to setters. why?
  private _toggleDisableOnChildren(value: boolean) {
    this.radioElements.forEach(el => (el.disabled = value));
  }

  //? How to do this
  // private _modifyPropertyonRadios(propertyName: any, value: any) {
  //   this.radioElements.forEach(el => el.propertyName = value);
  // }

  private _disabled = false;
  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this._disabled;
  }

  set disabled(newVal) {
    const oldVal = this._disabled;
    this._disabled = newVal;
    this.requestUpdate('disabled', oldVal);
    this._toggleDisableOnChildren(newVal);
  }

  private _value: FormDataEntryValue = '';
  @internalProperty()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldVal = this._value;
    this._value = newValue;
    this._internals.setFormValue(this._value);
    this.requestUpdate('value', oldVal);
  }

  private _name = '';
  @property({ type: String, reflect: true })
  get name() {
    return this._name;
  }

  set name(newVal) {
    const oldVal = this._name;
    this._name = newVal;
    this._addNameToRadios(this._name);
    this.requestUpdate('name', oldVal);
  }

  private _selected: number | null = null;
  @property({ type: Number, reflect: true })
  get selected() {
    return this._selected;
  }

  set selected(newVal) {
    const oldVal = this._selected;
    this._selected = newVal;
    this._selectSingleElement(newVal);
    this.value = newVal ? this.enabledRadioElements[newVal].value : '';
    this.requestUpdate('selected', oldVal);
  }

  private _selectPreviousElement() {
    if (this.selected === 0) {
      this.selected = this.enabledRadioElements.length - 1;
    } else if (this.selected !== null) {
      this.selected--;
    } else this.selected = 0;
  }

  private _selectNextElement() {
    if (this.selected === this.enabledRadioElements.length - 1) {
      this.selected = 0;
    } else if (this.selected !== null) {
      this.selected++;
    } else this.selected = 0; //when nothing is selected select first element
  }

  private _onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case ARROW_LEFT:
      case ARROW_UP: {
        e.preventDefault();
        this._selectPreviousElement();
        break;
      }
      case ARROW_RIGHT:
      case ARROW_DOWN: {
        e.preventDefault();
        this._selectNextElement();
        break;
      }

      case SPACE: {
        if (this.selected === null) this.selected = 0;
      }
    }
  }

  //add another argument - an array of element, but what type? We need globally declared type of all our elements.
  private _selectSingleElement(indexOfSelected: number | null) {
    const notSelected = this.enabledRadioElements.filter(
      el => this.enabledRadioElements.indexOf(el) !== indexOfSelected
    );

    if (indexOfSelected !== null) {
      this.enabledRadioElements[indexOfSelected].check();
    }
    if (this._selected === null) {
      this.enabledRadioElements[0].setAttribute('tabindex', '0');
    }
    notSelected.forEach(el => el.uncheck());
  }

  //how to abstract this method so it's reusable?
  private _handleSelectOnClick(e: Event) {
    const radios = this.enabledRadioElements;
    let selectedElement: UUIRadioElement;

    radios.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
        this.selected = radios.indexOf(el);
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
