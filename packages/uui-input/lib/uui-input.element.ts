import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
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
 * @slot input label - for the input label text.
 * @slot prepend - for components to render to the left of the input.
 * @slot append - for components to render to the right of the input.
 * @fires UUIInputEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 */
export class UUIInputElement extends FormControlMixin(LitElement) {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  static styles = [
    css`
      :host {
        position: relative;
        display: inline-flex;
        align-items: center;
        height: var(--uui-size-11);
        font-size: 15px;
        text-align: left;
        box-sizing: border-box;
        background-color: var(
          --uui-input-background-color,
          var(--uui-interface-surface)
        );
        border: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-interface-border));
      }
      :host(:hover) {
        border-color: var(
          --uui-input-border-color-hover,
          var(--uui-interface-border-hover)
        );
      }
      /* TODO: Fix so we dont get double outline when there is focus on things in the slot. */
      :host(:focus-within) {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-interface-border-focus)
        );
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-interface-outline);
      }
      :host(:focus) {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-interface-border-focus)
        );
      }
      :host([disabled]) {
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

      :host([show-validation]:invalid),
      /* polyfill support */
      :host([show-validation][internals-invalid]) {
        border-color: var(--uui-look-danger-border);
      }

      input {
        font-family: inherit;
        padding: var(--uui-size-1) var(--uui-size-space-3);
        font-size: 15px;
        color: inherit;
        border-radius: 0;
        box-sizing: border-box;
        border: none;
        background: none;
        width: 100%;
        text-align: inherit;
        outline: none;
      }

      input::placeholder {
        transition: opacity 120ms;
      }
      input:focus::placeholder {
        opacity: 0;
      }

      /* TODO: make sure color looks good, or remove it as an option as we want to provide color-picker component */
      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      ::slotted(uui-input) {
        height: 100%;
        --uui-input-border-width: 0;
      }
    `,
  ];

  /**
   * Label for input element.
   * @type {string}
   * @attr
   */
  @property({ type: String })
  public label!: string;

  /**
   * Defines the input placeholder.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  /**
   * This property specifies the type of input that will be rendered.
   * @type {'text' | 'tel'| 'url'| 'email'| 'password'| 'date'| 'month'| 'week'| 'time'| 'datetime-local'| 'number'| 'color'}
   * @attr
   * @default text
   */
  @property({ type: String })
  type: InputType = 'text';

  @query('input')
  private _input?: HTMLInputElement;

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  private onChange() {
    this.dispatchEvent(
      new UUIInputEvent(UUIInputEvent.CHANGE, { bubbles: true })
    );
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    this._setValidity();
  }

  // Validation
  private _validityState: any = {};

  /**
   * Set to true to show validation errors
   * @type {boolean}
   * @attr show-validation
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-validation', reflect: true })
  showValidation = false;

  /**
   * Set to true if the component should have an error state.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Required message.
   * @type {boolean}
   * @attr
   * @default
   */
  @property({ type: String, attribute: 'required-message' })
  requiredMessage = 'This field is required';

  /**
   * Apply custom error on this input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Custom error message.
   * @type {boolean}
   * @attr
   * @default
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = 'This field is invalid';

  constructor() {
    super();

    this.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
    });
    this.addEventListener('blur', () => {
      this.style.setProperty('--uui-show-focus-outline', '');
    });
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    (this.shadowRoot?.querySelector('#input') as any).focus();
  }

  private _setValidity() {
    // check for required
    if (this.required && this.value === '') {
      this._validityState.valueMissing = true;
      this._internals.setValidity(
        this._validityState,
        this.requiredMessage,
        this._input
      );
    } else {
      this._validityState.valueMissing = false;
    }

    // check for custom error
    if (this.error) {
      this._validityState.customError = true;
      this._internals.setValidity(
        this._validityState,
        this.errorMessage,
        this._input
      );
    } else {
      this._validityState.customError = false;
    }

    const hasError = Object.values(this._validityState).includes(true);

    if (hasError === false) {
      this._internals.setValidity({});
    }
  }

  protected renderPrepend() {
    return html`<slot name="prepend"></slot>`;
  }

  protected renderAppend() {
    return html`<slot name="append"></slot>`;
  }

  render() {
    return html`
      ${this.renderPrepend()}
      <input
        id="input"
        .type=${this.type}
        .value=${this.value}
        .name=${this.name}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        @input=${this.onInput}
        @change=${this.onChange} />
      ${this.renderAppend()}
    `;
  }
}
