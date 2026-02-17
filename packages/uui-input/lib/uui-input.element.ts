import {
  UUIFormControlMixin,
  LabelMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { UUIInputEvent } from './UUIInputEvent';

export type InputType =
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'password'
  | 'search'
  | 'month'
  | 'week'
  | 'time'
  | 'date'
  | 'datetime-local'
  | 'number'
  | 'color';

export type InputMode =
  | 'text'
  | 'none'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

/**
 * Custom element wrapping the native input element.This is a formAssociated element, meaning it can participate in a native HTMLForm. A name:value pair will be submitted.
 * @element uui-input
 * @slot prepend - for components to render to the left of the input.
 * @slot append - for components to render to the right of the input.
 * @property {boolean} spellcheck - get/set native spellcheck attribute
 * @attribute spellcheck - native spellcheck attribute
 * @property {string} value - get/set the value of the input
 * @attribute value - get/set the value of the input
 * @property {string} name - get/set the name of the input
 * @attribute name - get/set the name of the input
 * @fires UUIInputEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 * @cssprop --uui-input-height - Height of the element
 * @cssprop --uui-input-background-color - Background color of the element
 * @cssprop --uui-input-background-color-disabled - Background color when disabled
 * @cssprop --uui-input-background-color-readonly - Background color when readonly
 * @cssprop --uui-input-border-width - Border width
 * @cssprop --uui-input-border-color - Border color
 * @cssprop --uui-input-border-color-hover - Border color on hover
 * @cssprop --uui-input-border-color-focus - Border color on focus
 * @cssprop --uui-input-border-color-disabled - Border color when disabled
 * @cssprop --uui-input-border-color-readonly - Border color when readonly
 */
@defineElement('uui-input')
export class UUIInputElement extends UUIFormControlMixin(
  LabelMixin('', LitElement),
  '',
) {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  /**
   * Sets the min value of the input.
   * Examples: the first date the user may pick in date and datetime-local, or the min numeric value the user can pick in a number input.
   * @type {number | string}
   * @attr
   * @default undefined
   */
  @property()
  min?: number | string;

  /**
   * Sets the minimum length of the value of the input.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Minlength validation message.
   * @attr minlength-message
   * @default
   */
  @property({ attribute: 'minlength-message' })
  minlengthMessage: string | ((charsLeft: number) => string) = charsLeft =>
    `${charsLeft} characters left`;

  /**
   * Sets the max value of the input.
   * Examples: the last date the user may pick in date and datetime-local, or the max numeric value the user can pick in a number input.
   * @type {number | string}
   * @attr
   * @default undefined
   */
  @property()
  max?: number | string;

  /**
   * Sets the maximum length of the value of the input.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Maxlength validation message.
   * @attr maxlength-message
   * @default
   */
  @property({ attribute: 'maxlength-message' })
  maxlengthMessage: string | ((max: number, current: number) => string) = (
    max,
    current,
  ) => `Maximum ${max} characters, ${current - max} too many.`;

  /**
   * Specifies the interval between legal numbers of the input
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  step?: number;

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
   * Sets the input width to fit the value or placeholder if empty
   * @type {boolean}
   * @attr auto-width
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-width' })
  autoWidth = false;

  /**
   * This property specifies the type of input that will be rendered.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types|MDN} for further information
   * @type {'text' | 'tel' | 'url' | 'email' | 'password' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'color'}
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

  /**
   * The inputmode global attribute is an enumerated attribute that hints at the type of data that might be entered by the user while editing the element or its contents. This allows a browser to display an appropriate virtual keyboard.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode|MDN} for further information
   * @type {'text' | 'none' | 'decimal' | 'number' | 'tel' | 'search' | 'email' | 'url'}
   * @attr
   * @default text
   */
  @property({ attribute: 'inputmode' })
  inputMode: InputMode = 'text';

  /**
   * Validates the input based on the Regex pattern
   * @type {string}
   * @attr
   */
  @property({ type: String })
  pattern?: string;

  /**
   * Set the input tabindex, set this to `-1` to avoid tabbing into the input.
   * @type {number}
   * @attr
   */
  @property({ type: Number, reflect: false, attribute: 'tabindex' })
  tabIndex: number = 0;

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
    this.addEventListener('keydown', this.#onKeyDown);

    this.addValidator(
      'tooShort',
      () => {
        const label = this.minlengthMessage;
        if (typeof label === 'function') {
          return label(
            this.minlength ? this.minlength - String(this.value).length : 0,
          );
        }
        return label;
      },
      () => !!this.minlength && String(this.value).length < this.minlength,
    );
    this.addValidator(
      'tooLong',
      () => {
        const label = this.maxlengthMessage;
        if (typeof label === 'function') {
          return label(this.maxlength ?? 0, String(this.value).length);
        }
        return label;
      },
      () => !!this.maxlength && String(this.value).length > this.maxlength,
    );

    this.updateComplete.then(() => {
      this.addFormControlElement(this._input);
    });
  }

  #onKeyDown(e: KeyboardEvent): void {
    if (this.type !== 'color' && e.key == 'Enter') {
      this.submit();
    }
  }

  /**
   * Removes focus from the input.
   */
  async blur() {
    await this.updateComplete;
    this._input.blur();
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  async focus() {
    await this.updateComplete;
    this._input.focus();
  }

  /**
   * Selects all the text in the input.
   */
  async select() {
    await this.updateComplete;
    this._input.select();
  }

  protected getFormElement(): HTMLElement {
    return this.shadowRoot?.querySelector('input') as HTMLElement;
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
      ${this.autoWidth ? this.renderInputWithAutoWidth() : this.renderInput()}
      ${this.renderAppend()}
    `;
  }

  private renderInputWithAutoWidth() {
    return html`<div id="autoWidth">
      ${this.renderInput()}${this.renderAutoWidthBackground()}
    </div>`;
  }

  renderInput() {
    return html`<input
      id="input"
      size=${ifDefined(this.autoWidth ? '1' : undefined)}
      .type=${this.type}
      .value=${this.value as string}
      .name=${this.name}
      pattern=${ifDefined(this.pattern)}
      min=${ifDefined(this.min)}
      max=${ifDefined(this.max)}
      step=${ifDefined(this.step)}
      spellcheck=${this.spellcheck}
      autocomplete=${ifDefined(this.autocomplete as any)}
      placeholder=${ifDefined(this.placeholder)}
      aria-label=${ifDefined(this.label)}
      inputmode=${ifDefined(this.inputMode)}
      ?disabled=${this.disabled}
      ?autofocus=${this.autofocus}
      ?required=${this.required}
      ?readonly=${this.readonly}
      tabindex=${ifDefined(this.tabIndex)}
      @input=${this.onInput}
      @change=${this.onChange} />`;
  }

  private renderAutoWidthBackground() {
    return html` <div id="auto" aria-hidden="true">${this.renderText()}</div>`;
  }

  private renderText() {
    return html`${(this.value as string).length > 0
      ? this.value
      : this.placeholder}`;
  }

  static styles = [
    css`
      :host {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        height: var(--uui-input-height, var(--uui-size-11));
        text-align: left;
        color: var(--uui-color-text);
        color-scheme: var(--uui-color-scheme, normal);
        box-sizing: border-box;
        background-color: var(
          --uui-input-background-color,
          var(--uui-color-surface)
        );
        border: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-color-border));
        border-radius: var(--uui-border-radius);
        min-width: 0;

        --uui-input-padding: 1px var(--uui-size-space-3);
        --uui-button-height: 100%;
        --auto-width-text-margin-right: 0;
        --auto-width-text-margin-left: 0;
      }

      #autoWidth {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 0;
      }

      #auto {
        border: 0 1px solid transparent;
        visibility: hidden;
        white-space: pre;
        z-index: -1;
        height: 0px;
        padding: 0 var(--uui-size-space-3);
        margin: 0 var(--auto-width-text-margin-right) 0
          var(--auto-width-text-margin-left);
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
      :host([disabled]) input {
        -webkit-text-fill-color: var(
          --uui-color-disabled-contrast
        ); /* required on Safari and IOS */
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
        border-color: var(--uui-color-invalid);
      }

      input {
        font-family: inherit;
        padding: var(--uui-input-padding);
        font-size: inherit;
        color: inherit;
        border-radius: var(--uui-border-radius);
        box-sizing: border-box;
        border: none;
        background: none;
        min-width: 0;
        flex-grow: 1;
        flex-shrink: 1;
        height: inherit;
        text-align: inherit;
        outline: none;
        text-overflow: ellipsis;
      }

      input[type='password']::-ms-reveal {
        display: none;
      }

      /* TODO: make sure color looks good, or remove it as an option as we want to provide color-picker component */
      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      slot[name='prepend'],
      slot[name='append'] {
        display: flex;
        align-items: center;
        line-height: 1;
        height: 100%;
        min-width: 0;
      }

      ::slotted(uui-input),
      ::slotted(uui-input-lock) {
        height: 100%;
        --uui-input-border-width: 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input': UUIInputElement;
  }
}
