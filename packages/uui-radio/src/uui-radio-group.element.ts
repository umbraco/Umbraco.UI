import { LitElement, html } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { UUIRadioElement } from './uui-radio.element';
import { UUIRadioEvent } from './UUIRadioEvent';
import { UUIRadioGroupEvent } from './UUIRadioGroupEvent';

//TODO required?
//TODO focused style

const ARROW_LEFT = 'ArrowLeft';
const ARROW_UP = 'ArrowUp';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_DOWN = 'ArrowDown';
const SPACE = ' ';

/**
 *  @element uui-radio-group
 *  @slot for uui-radio elements
 */
export class UUIRadioGroupElement extends LitElement {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
    this.addEventListener('keydown', this._onKeydown);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'radiogroup');
  }

  private radioElements!: UUIRadioElement[];

  private getRadioElements(): UUIRadioElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(el => el instanceof UUIRadioElement) as UUIRadioElement[])
      : [];
  }

  @query('slot') protected slotElement!: HTMLSlotElement;

  private _addNameToRadios(name: string, radios: UUIRadioElement[]) {
    radios.forEach(el => (el.name = name));
  }

  private _toggleDisableOnChildren(value: boolean) {
    this.radioElements.forEach(el => (el.disabled = value));
  }

  private _handleSlotChange() {
    if (this.radioElements) {
      this.radioElements.forEach(el => {
        el.removeEventListener(
          UUIRadioEvent.CHANGE,
          // @ts-ignore TODO: fix typescript error
          this._handleSelectOnClick as EventHandlerNonNull
        );
      });
    }

    this.radioElements = this.getRadioElements();

    this.radioElements.forEach(el => {
      el.addEventListener(
        UUIRadioEvent.CHANGE,
        // @ts-ignore TODO: fix typescript error
        this._handleSelectOnClick as EventHandlerNonNull
      );
    });

    const checkedRadios = this.radioElements.filter(el => el.checked === true);

    if (checkedRadios.length > 1) {
      this.radioElements.forEach(el => {
        el.checked = false;
      });
      throw new Error(
        'There can only be one checked element among the <uui-radio-group> children'
      );
    }
    if (checkedRadios.length === 1) {
      this._selected = this.radioElements.indexOf(checkedRadios[0]);
      this.value = checkedRadios[0].value;
    }

    // TODO: Make sure we set the tabindex on the actual checked element not just the first.
    if (this.radioElements.length > 0) {
      this.radioElements[this.enabledElementsIndexes[0]].setAttribute(
        'tabindex',
        '0'
      );
    }
    this._addNameToRadios(this.name, this.radioElements);
    if (this.disabled) this._toggleDisableOnChildren(true);
  }

  private _disabled = false;

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
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
  @state()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldVal = this._value;
    this._value = newValue;
    if (
      'ElementInternals' in window &&
      //@ts-ignore
      'setFormValue' in window.ElementInternals.prototype
    ) {
      this._internals.setFormValue(this._value);
    }
    this.requestUpdate('value', oldVal);
  }

  private _name = '';
  /**
   * This is a name property of the `<uui-radio-group>` component. It reflects the behaviour of the native `<input />` element and its name attribute.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  get name() {
    return this._name;
  }

  set name(newVal) {
    const oldVal = this._name;
    this._name = newVal;
    if (this.radioElements)
      this._addNameToRadios(this._name, this.radioElements);
    this.requestUpdate('name', oldVal);
  }

  private _selected: number | null = null;

  /**
   * This is an index of
   * @type {number | null}
   * @default null
   */
  @property({ type: Number })
  get selected() {
    return this._selected;
  }

  set selected(newVal) {
    const oldVal = this._selected;
    this._setSelected(newVal);
    if (this._selected !== null) {
      this.radioElements[this._selected].check();
    }
    this.requestUpdate('selected', oldVal);
  }

  private _setSelected(newVal: number | null) {
    this._selected = newVal;
    this._lastSelectedIndex = this.enabledElementsIndexes.findIndex(
      index => index === this._selected
    );
    if (newVal === null) {
      this.radioElements[0].setAttribute('tabindex', '0');
    }
    const notSelected = this.radioElements.filter(
      el => this.radioElements.indexOf(el) !== this._selected
    );
    notSelected.forEach(el => el.uncheck());
    this.value = newVal !== null ? this.radioElements[newVal].value : '';
  }

  // TODO: Need to move away from using this getter method for this.
  protected get enabledElementsIndexes() {
    const indexes: number[] = [];
    this.radioElements.forEach(el => {
      if (el.disabled === false) indexes.push(this.radioElements.indexOf(el));
    });
    return indexes;
  }

  private _lastSelectedIndex = 0; //this is index in the array of enalbled radios indexes (this.enabledElementsIndexes)
  private _selectPreviousElement() {
    if (
      this.selected === null ||
      this.selected === this.enabledElementsIndexes[0]
    ) {
      this.selected =
        this.enabledElementsIndexes[this.enabledElementsIndexes.length - 1];
      this._lastSelectedIndex = this.enabledElementsIndexes.length - 1;
    } else {
      this._lastSelectedIndex--;
      this.selected = this.enabledElementsIndexes[this._lastSelectedIndex];
    }
    this._fireChangeEvent();
  }

  private _selectNextElement() {
    if (
      this.selected === null ||
      this.selected ===
        this.enabledElementsIndexes[this.enabledElementsIndexes.length - 1]
    ) {
      this.selected = this.enabledElementsIndexes[0];
      this._lastSelectedIndex = 0;
    } else {
      this._lastSelectedIndex++;
      this.selected = this.enabledElementsIndexes[this._lastSelectedIndex];
    }
    this._fireChangeEvent();
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

  private _fireChangeEvent() {
    this.dispatchEvent(new UUIRadioGroupEvent(UUIRadioGroupEvent.CHANGE));
  }

  //TODO add event
  private _handleSelectOnClick = (e: UUIRadioEvent) => {
    this._setSelected(this.radioElements.indexOf(e.target));
    this._fireChangeEvent();
  };

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}> </slot> `;
  }
}
