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
//TODO focused style
//TODO fix the disabled selected - how that should behave

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

    this._checkForSelected();
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

  //someone help me refactor these two to one method
  private _addNameToRadios(name: string) {
    this.radioElements.forEach(el => (el.name = name));
  }

  private _toggleDisableOnChildren(value: boolean) {
    this.radioElements.forEach(el => (el.disabled = value));
  }

  private _checkForSelected() {
    const checkedRadios = this.radioElements.filter(el => el.checked === true);

    if (checkedRadios.length > 1) {
      this.radioElements.forEach(el => {
        el.checked = false;
      });
      throw new Error(
        'There can only be one checked element among the <uui-radio-group> children'
      );
    }
    if (checkedRadios.length === 1) this.value = checkedRadios[0].value;
  }

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
    if (newVal === null) {
      this.radioElements[0].setAttribute('tabindex', '0');
    }
    this._selectSingleElement(newVal);
    this.value = newVal !== null ? this.radioElements[newVal].value : '';
    this.requestUpdate('selected', oldVal);
  }

  protected get enabledElementsIndexes() {
    const indexes: number[] = [];
    this.radioElements.forEach(el => {
      if (el.disabled === false) indexes.push(this.radioElements.indexOf(el));
    });
    return indexes;
  }

  private _lastSelected = 0;
  private _selectPreviousElement() {
    if (
      this.selected === null ||
      this.selected === this.enabledElementsIndexes[0]
    ) {
      this.selected = this.enabledElementsIndexes[
        this.enabledElementsIndexes.length - 1
      ];
      this._lastSelected = this.enabledElementsIndexes.length - 1;
    } else {
      this._lastSelected--;
      this.selected = this.enabledElementsIndexes[this._lastSelected];
    }
  }

  private _selectNextElement() {
    if (
      this.selected === null ||
      this.selected ===
        this.enabledElementsIndexes[this.enabledElementsIndexes.length - 1]
    ) {
      this.selected = this.enabledElementsIndexes[0];
      this._lastSelected = 0;
    } else {
      this._lastSelected++;
      this.selected = this.enabledElementsIndexes[this._lastSelected];
    }
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
        if (this.selected === null)
          this.selected = this.enabledElementsIndexes[0];
      }
    }
  }

  private _selectSingleElement(indexOfSelected: number | null) {
    const notSelected = this.radioElements.filter(
      el => this.radioElements.indexOf(el) !== indexOfSelected
    );
    if (indexOfSelected !== null) {
      this.radioElements[indexOfSelected].check();
    }
    notSelected.forEach(el => el.uncheck());
  }

  private _handleSelectOnClick(e: Event) {
    const radios = this.radioElements;
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
