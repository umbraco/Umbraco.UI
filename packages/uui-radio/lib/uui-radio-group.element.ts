import { LitElement, html, css } from 'lit';
import { query, property } from 'lit/decorators.js';
import { UUIRadioElement } from './uui-radio.element';
import { UUIRadioEvent } from './UUIRadioEvent';
import { UUIRadioGroupEvent } from './UUIRadioGroupEvent';
import { FormControlMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

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
export class UUIRadioGroupElement extends FormControlMixin(
  LabelMixin('', LitElement)
) {
  static styles = css`
    .label {
      display: inline-block;
      margin-bottom: var(--uui-size-1);
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.addEventListener('keydown', this._onKeydown);
  }

  /**
   * This method enables <label for="..."> to focus the select
   */
  focus() {
    this.radioElements[this._selected || 0]?.focus();
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
    this.radioElements?.forEach(el => (el.disabled = value));
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

  /**
   * Set to true to hide the labeling provided by the component.
   * @type {boolean}
   * @attr hide-label
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

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

  private _handleSelectOnClick = (e: UUIRadioEvent) => {
    this._setSelected(this.radioElements.indexOf(e.target));
    this._fireChangeEvent();
  };

  updated(changedProperties: any) {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      this._toggleDisableOnChildren(changedProperties.get('disabled'));
    }

    if (changedProperties.has('name') && this.radioElements) {
      this._addNameToRadios(changedProperties.get('name'), this.radioElements);
    }

    this._setValidity();
  }

  @query('#radioGroup')
  private _radioGroup?: HTMLElement;

  /**
   * This is a value property of the uui-input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  private _validityState: any = {};

  private _setValidity() {
    this._setRequired();
    this._setCustomError();

    const hasError = Object.values(this._validityState).includes(true);

    if (hasError === false) {
      this._internals.setValidity({});
    }
  }

  private _setRequired() {
    if (this.hasAttribute('required') && this.value === '') {
      this._validityState.valueMissing = true;
      this._internals.setValidity(
        this._validityState,
        'The field is required',
        this._radioGroup
      );
    } else {
      this._validityState.valueMissing = false;
    }
  }

  private _setCustomError() {
    if (this.error) {
      this._validityState.customError = true;
      this._internals.setValidity(
        this._validityState,
        'The field is invalid',
        this._radioGroup
      );
    } else {
      this._validityState.customError = false;
    }
  }

  render() {
    return html`
      ${this.hideLabel === false ? this.renderLabel() : ''}
      <div id="radioGroup">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
