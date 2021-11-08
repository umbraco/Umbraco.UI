import { LitElement, html, css } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUIInputEvent } from './UUIInputEvent';

export type InputType =
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'password'
  | 'date'
  | 'month'
  | 'week'
  | 'time'
  | 'datetime-local'
  | 'number'
  | 'color';

/**
 * Custom element wrapping the native input element.This is a formAssociated element, meaning it can participate in a native HTMLForm. A name:value pair will be submitted.
 * @element uui-input
 * @extends LabelMixin(LitElement)
 * @slot input label - for the input label text.
 * @fires UUIInputEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 */
export class UUIInputElement extends LabelMixin('input label', LitElement) {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      input {
        display: inline-block;
        height: var(--uui-size-11);
        padding: var(--uui-size-1) var(--uui-size-2);
        font-family: inherit;
        font-size: 15px;
        color: inherit;
        border-radius: 0;
        box-sizing: border-box;
        background-color: var(
          --uui-input-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-input-border-color, var(--uui-interface-border));
        width: 100%;
        outline: none;
      }

      input:hover {
        border-color: var(
          --uui-input-border-color-hover,
          var(--uui-interface-border-hover)
        );
      }

      input:focus {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-interface-border-focus)
        );
      }

      :host([type='color']) {
        display: inline-flex;
        align-items: center;
      }

      :host([type='color']) .label {
        margin-left: var(--uui-size-2);
      }

      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      input[disabled] {
        background-color: var(
          --uui-input-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        border: 1px solid
          var(
            --uui-input-border-color-disabled,
            var(--uui-interface-border-disable)
          );

        color: var(--uui-interface-contrast-disabled);
      }

      :host([disabled]) .label {
        color: var(--uui-interface-contrast-disabled);
      }

      .label {
        display: inline-block;
        margin-bottom: var(--uui-size-1);
        font-weight: bold;
      }

      :host(:invalid) input {
        border: 1px solid var(--uui-look-danger-border);
      }

      /*
      :host([error]) input {
        border: 1px solid var(--uui-look-danger-border);
      }
      */
    `,
  ];

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private _internals;
  private _error: Boolean = false;
  private _validityState: any = {};

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  /**
   * Defines the input placeholder.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set to true to hide the labeling provided by the component.
   * @type {boolean}
   * @attr hide-label
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  @state()
  private _value = '';

  /**
   * This is a value property of the uui-input.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    this._internals.setFormValue(this._value);
    this.requestUpdate('value', oldValue);
  }

  /**
   * This is a value property of the uui-input.
   * @type {boolean}
   * @attr
   * @default ''
   */
  @property({ type: Boolean, reflect: true })
  get error() {
    return this._error;
  }
  set error(newValue) {
    const oldValue = this._error;
    this._error = newValue;
    this.requestUpdate('error', oldValue);
  }

  /**
   * This is a name property of the `<uui-input>` component. It reflects the behaviour of the native `<input />` element and its name attribute.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * This property specifies the type of input that will be rendered.
   * @type {'text' | 'tel'| 'url'| 'email'| 'password'| 'date'| 'month'| 'week'| 'time'| 'datetime-local'| 'number'| 'color'}
   * @attr
   * @default text
   */
  @property({ type: String })
  type: InputType = 'text';

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  @query('input')
  private _input?: HTMLInputElement;

  private onChange() {
    this.dispatchEvent(
      new UUIInputEvent(UUIInputEvent.CHANGE, { bubbles: true })
    );
  }

  updated () {
    this._setValidity();
  }

  private _setValidity () {

    if (this.hasAttribute('required') && this.value === '') {
      this._validityState.valueMissing = true;
      this._internals.setValidity(this._validityState, 'The field is required', this._input);
    }
    else {
      this._validityState.valueMissing = false;
    }

    if (this._error) {
      this._validityState.customError = true;
      this._internals.setValidity(this._validityState, 'The field is invalid', this._input);
    }
    else {
      this._validityState.customError = false;
    }


    let hasError = false;

    for (const [key, value] of Object.entries(this._validityState)) {
      if (value === true) {
        hasError = true;
      }
    }

    if (hasError === false) {
      this._internals.setValidity({});
    }

    console.log('Has error', hasError);
  }
  
  // FORM CONTROLS
  public formResetCallback() {
    this.value = this.getAttribute('value') || '';
  }
  
  public checkValidity () {
    return this._internals?.checkValidity();
  }

  render() {
    return html`
      ${this.hideLabel === false ? this.renderLabel() : ''}
      <input
        .type=${this.type}
        .value=${this.value}
        .name=${this.name}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        @input=${this.onInput}
        @change=${this.onChange} />
    `;
  }
}
