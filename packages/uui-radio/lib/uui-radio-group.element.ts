import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIRadioElement } from './uui-radio.element';
import { UUIRadioEvent } from './UUIRadioEvent';
import { UUIRadioGroupEvent } from './UUIRadioGroupEvent';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';

const ARROW_LEFT = 'ArrowLeft';
const ARROW_UP = 'ArrowUp';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_DOWN = 'ArrowDown';
const SPACE = ' ';

/**
 *  @element uui-radio-group
 *  @slot for uui-radio elements
 */
export class UUIRadioGroupElement extends FormControlMixin(LitElement) {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  static styles = [
    css`
      :host {
        display: inline-block;
        padding-right: 3px;
        border: 1px solid transparent;
        border-radius: var(--uui-border-radius);
      }

      :host(:not([hide-validation]):invalid),
      /* polyfill support */
      :host(:not([hide-validation])[internals-invalid]) {
        border: 1px solid var(--uui-look-danger-border);
      }
    `,
  ];

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  get value() {
    return this._value;
  }
  set value(newValue) {
    super.value = newValue;
    if (newValue === null || newValue === '') {
      this._makeFirstEnabledFocusable();
    }
    this.radioElements.forEach((el, index) => {
      if (el.value === newValue) {
        el.checked = true;
        this._selected = index;
      } else {
        el.checked = false;
      }
    });
  }

  private _selected: number | null = null;

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

  protected getFormElement(): HTMLElement | undefined {
    if (this.radioElements && this._selected) {
      return this.radioElements[this._selected];
    }
    return undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'radiogroup');
  }

  private radioElements!: UUIRadioElement[];
  private _setNameOnRadios(name: string) {
    this.radioElements?.forEach(el => (el.name = name));
  }

  private _setDisableOnRadios(value: boolean) {
    this.radioElements?.forEach(el => (el.disabled = value));
  }

  private _handleSlotChange(e: Event) {
    // TODO: make sure to diff new and old ones to only add and remove event listeners on relevant elements.

    if (this.radioElements) {
      this.radioElements.forEach(el => {
        el.removeEventListener(
          UUIRadioEvent.CHANGE,
          // @ts-ignore TODO: fix typescript error
          this._handleSelectOnClick as EventHandlerNonNull
        );
      });
    }

    this.radioElements = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(el => el instanceof UUIRadioElement) as UUIRadioElement[];

    if (this.radioElements.length > 0) {
      this.radioElements.forEach(el => {
        el.addEventListener(
          UUIRadioEvent.CHANGE,
          // @ts-ignore TODO: fix typescript error
          this._handleSelectOnClick as EventHandlerNonNull
        );
      });

      const checkedRadios = this.radioElements.filter(
        el => el.checked === true
      );

      if (checkedRadios.length > 1) {
        this.radioElements.forEach(el => {
          el.checked = false;
        });
        throw new Error(
          'There can only be one checked element among the <uui-radio-group> children'
        );
        return;
      }

      if (checkedRadios.length === 1) {
        this.value = checkedRadios[0].value;
        if (checkedRadios[0].disabled === false) {
          checkedRadios[0].makeFocusable();
        } else {
          this._makeFirstEnabledFocusable();
        }

        this._setNameOnRadios(this.name);
        if (this.disabled) {
          this._setDisableOnRadios(true);
        }
      } else {
        this._makeFirstEnabledFocusable();
      }
    } else {
      this._makeFirstEnabledFocusable();
    }
  }

  private _makeFirstEnabledFocusable() {
    this._findNextEnabledElement()?.makeFocusable();
  }

  private _findNextEnabledElement(
    direction: number = 1
  ): UUIRadioElement | null {
    if (!this.radioElements) {
      return null;
    }
    const origin = this._selected || 0;
    const len = this.radioElements.length;
    let i = this._selected === null ? 0 : 1; //If we have something selected we will skip checking it self.
    while (i < len) {
      let checkIndex = (origin + i * direction) % len;
      if (checkIndex < 0) {
        checkIndex += len;
      }
      if (this.radioElements[checkIndex].disabled === false) {
        return this.radioElements[checkIndex];
      }
      i++;
    }
    return null;
  }

  private _selectPreviousElement() {
    this.value = this._findNextEnabledElement(-1)?.value || '';
    this._fireChangeEvent();
  }

  private _selectNextElement() {
    this.value = this._findNextEnabledElement()?.value || '';
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
        if (this._selected === null) {
          this.value = this._findNextEnabledElement()?.value as string;
        }
      }
    }
  }

  private _fireChangeEvent() {
    this.dispatchEvent(new UUIRadioGroupEvent(UUIRadioGroupEvent.CHANGE));
  }

  private _handleSelectOnClick = (e: UUIRadioEvent) => {
    this.value = e.target.value;
    this._fireChangeEvent();
  };

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      this._setDisableOnRadios(changedProperties.get('disabled') as boolean);
    }

    if (changedProperties.has('name')) {
      this._setNameOnRadios(changedProperties.get('name') as string);
    }
  }

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }
}
