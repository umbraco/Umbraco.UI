import { FormControlMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

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
 * @slot prepend - for components to render to the left of the input.
 * @slot append - for components to render to the right of the input.
 * @fires UUIInputEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 */
@defineElement('uui-input')
export class UUIInputElement extends FormControlMixin(
  LabelMixin('', LitElement)
) {
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
        text-align: left;
        box-sizing: border-box;
        background-color: var(
          --uui-input-background-color,
          var(--uui-color-surface)
        );
        border: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-color-border));

        --uui-button-height: 100%;
      }
      :host(:hover) {
        border-color: var(
          --uui-input-border-color-hover,
          var(--uui-color-border-standalone)
        );
      }
      /* TODO: Fix so we dont get double outline when there is focus on things in the slot. */
      :host(:focus-within) {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-color-border-emphasis)
        );
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }
      :host(:focus) {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-color-border-emphasis)
        );
      }
      :host([disabled]) {
        background-color: var(
          --uui-input-background-color-disabled,
          var(--uui-color-disabled)
        );
        border-color: var(
          --uui-input-border-color-disabled,
          var(--uui-color-disabled)
        );

        color: var(--uui-color-disabled-contrast);
      }
      :host([readonly]) {
        background-color: var(
          --uui-input-background-color-readonly,
          var(--uui-color-disabled)
        );
        border-color: var(
          --uui-input-border-color-readonly,
          var(--uui-color-disabled-standalone)
        );
      }

      :host(:not([pristine]):invalid),
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) {
        border-color: var(--uui-color-danger);
      }

      input {
        font-family: inherit;
        padding: var(--uui-size-1) var(--uui-size-space-3);
        font-size: inherit;
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
      :host(:not([readonly])) input:focus::placeholder {
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
   * This is a minimum value of the input.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Minlength validation message.
   * @type {boolean}
   * @attr
   * @default
   */
  @property({ type: String, attribute: 'minlength-message' })
  minlengthMessage = 'This field need more characters';

  /**
   * This is a maximum value of the input.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Maxlength validation message.
   * @type {boolean}
   * @attr
   * @default
   */
  @property({ type: String, attribute: 'maxlength-message' })
  maxlengthMessage = 'This field exceeds the allowed amount of characters';

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Defines the input placeholder.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  /**
   * Defines the input autocomplete.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property()
  autocomplete?: string;

  /**
   * This property specifies the type of input that will be rendered.
   * @type {'text' | 'tel'| 'url'| 'email'| 'password'| 'date'| 'month'| 'week'| 'time'| 'datetime-local'| 'number'| 'color'}
   * @attr
   * @default text
   */
  @property({ type: String })
  get type(): InputType {
    return this._type;
  }
  set type(value: InputType) {
    this._type = value;
  }

  @query('#input')
  _input!: HTMLInputElement;

  private _type: InputType = 'text';

  constructor() {
    super();

    this.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
    });
    this.addEventListener('blur', () => {
      this.style.setProperty('--uui-show-focus-outline', '');
    });
    this.addEventListener('keypress', this._onKeypress);

    this.addValidator(
      'tooShort',
      () => this.minlengthMessage,
      () => !!this.minlength && (this._value as string).length < this.minlength
    );
    this.addValidator(
      'tooLong',
      () => this.maxlengthMessage,
      () => !!this.maxlength && (this._value as string).length > this.maxlength
    );
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.addFormControlElement(this._input);
  }

  private _onKeypress(e: KeyboardEvent): void {
    if (this.type !== 'color' && e.key == 'Enter') {
      this.submit();
    }
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    this._input.focus();
  }

  protected getFormElement(): HTMLElement {
    return this._input;
  }

  protected onInput(e: Event) {
    e.stopPropagation();
    this.value = (e.target as HTMLInputElement).value;

    this.dispatchEvent(new UUIInputEvent(UUIInputEvent.INPUT));
  }

  protected onChange(e: Event) {
    e.stopPropagation();
    this.pristine = false;
    this.dispatchEvent(new UUIInputEvent(UUIInputEvent.CHANGE));
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
        .value=${this.value as string}
        .name=${this.name}
        autocomplete=${ifDefined(this.autocomplete as any)}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        ?required=${this.required}
        ?readonly=${this.readonly}
        @input=${this.onInput}
        @change=${this.onChange} />
      ${this.renderAppend()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input': UUIInputElement;
  }
}
