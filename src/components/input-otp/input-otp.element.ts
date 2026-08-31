import {
  LabelMixin,
  UUIFormControlMixin,
} from '../../internal/mixins/index.js';
import type { InputType } from '../input/input.element.js';
import { UUIInputEvent } from '../input/UUIInputEvent.js';

import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';

/**
 * A one-time-code input. Renders a group of single-character inputs that together make up one value.
 * Typing moves focus to the next character, backspace and the arrow keys move backwards, and pasting a
 * code distributes it across the inputs. This is a formAssociated element, meaning it can participate
 * in a native HTMLForm. A name:value pair will be submitted.
 * @element uui-input-otp
 * @property {string} value - get/set the joined value of the character inputs
 * @attribute value - get/set the joined value of the character inputs
 * @property {string} name - get/set the name of the input
 * @attribute name - get/set the name of the input
 * @fires UUIInputEvent#change on change
 * @cssprop --uui-input-otp-gap - Space between the character inputs
 * @cssprop --uui-input-otp-size - Width and height of each character input
 */
export class UUIInputOtpElement extends UUIFormControlMixin(
  LabelMixin('', LitElement),
  '',
) {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  /**
   * Accepts only numbers.
   * @type {boolean}
   * @attr integer-only
   * @default false
   */
  @property({ type: Boolean, attribute: 'integer-only' })
  set integerOnly(value: boolean) {
    this.inputMode = value ? 'numeric' : 'text';
  }
  get integerOnly() {
    return this.inputMode === 'numeric';
  }

  /**
   * If true, the entered characters are masked.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  set masked(value: boolean) {
    this._input = value ? 'password' : 'text';
  }
  get masked() {
    return this._input === 'password';
  }

  /**
   * The number of characters in the code.
   * @type {number}
   * @attr
   * @default 6
   */
  @property({ type: Number })
  length = 6;

  /**
   * The template used for the accessible label of each character input.
   * @type {(index: number) => string}
   * @default (index) => `Character number ${index + 1}`
   */
  @property({ type: String, attribute: false })
  itemLabelTemplate = (index: number) => `Character number ${index + 1}`;

  /**
   * Set to true to make this input readonly.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Set to true to disable this input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set to true to autofocus the first character input.
   * @type {boolean}
   * @attr autofocus
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'autofocus' })
  autoFocus = false;

  /**
   * Add a placeholder to the inputs in the group.
   * @remark The placeholder should be a string with the same length as the `length` attribute and will be distributed to each input in the group
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  /**
   * The autocomplete attribute specifies whether or not an input field should have autocomplete enabled.
   * @remark Set the autocomplete attribute to "one-time-code" to enable autofill of one-time-code inputs
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String, reflect: true })
  autocomplete?: string;

  /**
   * Minlength validation message, shown when fewer than `length` characters have been entered.
   * @type {string}
   * @attr minlength-message
   * @default 'This field need more characters'
   */
  @property({ type: String, attribute: 'minlength-message' })
  minlengthMessage = 'This field need more characters';

  @state()
  _input: InputType = 'text';

  @state()
  _tokens: string[] = [];

  override set value(value: string) {
    this._tokens = value.split('');

    super.value = value;
    this.dispatchEvent(new UUIInputEvent(UUIInputEvent.CHANGE));
  }
  override get value(): string {
    return String(super.value);
  }

  constructor() {
    super();
    this.addEventListener('paste', this.onPaste.bind(this));

    this.addValidator(
      'tooShort',
      () => this.minlengthMessage,
      () => !!this.length && this.value.length < this.length,
    );
  }

  protected getFormElement(): HTMLElement | null | undefined {
    return this;
  }

  protected onInput(event: InputEvent, index: number) {
    const target = event.target as HTMLInputElement;
    this._tokens[index] = target?.value;
    this.value = this._tokens.join('');

    if (event.inputType === 'deleteContentBackward') {
      this.moveToPrev(event);
    } else if (
      event.inputType === 'insertText' ||
      event.inputType === 'deleteContentForward'
    ) {
      this.moveToNext(event);
    }
  }

  protected onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    switch (event.code) {
      case 'ArrowLeft':
        this.moveToPrev(event);
        event.preventDefault();

        break;

      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();

        break;

      case 'Backspace':
        if ((event.target as HTMLInputElement)?.value.length === 0) {
          this.moveToPrev(event);
          event.preventDefault();
        }

        break;

      case 'ArrowRight':
        this.moveToNext(event);
        event.preventDefault();

        break;

      default:
        if (
          (this.integerOnly &&
            !(Number(event.key) >= 0 && Number(event.key) <= 9)) ||
          (this._tokens.join('').length >= this.length &&
            event.code !== 'Delete')
        ) {
          event.preventDefault();
        }

        break;
    }
  }

  protected onPaste(event: ClipboardEvent) {
    const paste = event.clipboardData?.getData('text');

    if (paste?.length) {
      const pastedCode = paste.substring(0, this.length);

      if (!this.integerOnly || !isNaN(Number(pastedCode))) {
        this.value = pastedCode;
      }
    }

    event.preventDefault();
  }

  protected moveToPrev(event: Event) {
    if (!event.target) return;
    const prevInput = this.findPrevInput(event.target);

    if (prevInput) {
      prevInput.focus();
      prevInput.select();
    }
  }

  protected moveToNext(event: Event) {
    if (!event.target) return;
    const nextInput = this.findNextInput(event.target);

    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  }

  protected findNextInput(element: EventTarget): HTMLInputElement | null {
    const nextElement = (element as Element).nextElementSibling;

    if (!nextElement) return null;

    return nextElement.nodeName === 'INPUT'
      ? (nextElement as HTMLInputElement)
      : this.findNextInput(nextElement);
  }

  protected findPrevInput(element: EventTarget): HTMLInputElement | null {
    const prevElement = (element as Element).previousElementSibling;

    if (!prevElement) return null;

    return prevElement.nodeName === 'INPUT'
      ? (prevElement as HTMLInputElement)
      : this.findPrevInput(prevElement);
  }

  protected renderInput(index: number) {
    return html`
      <input
        class="otp-input"
        type=${this._input}
        .value=${this._tokens[index] || ''}
        .placeholder=${this.placeholder.charAt(index) || ''}
        .inputMode=${this.inputMode}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        ?autofocus=${this.autoFocus && index === 0}
        aria-label=${this.itemLabelTemplate(index)}
        @input=${(e: InputEvent) => this.onInput(e, index)}
        @keydown=${this.onKeyDown} />
    `;
  }

  render() {
    return html`
      <fieldset id="otp-input-group" aria-label=${ifDefined(this.label)}>
        ${repeat(Array.from({ length: this.length }), (_, i) =>
          this.renderInput(i),
        )}
      </fieldset>
    `;
  }

  static readonly styles = [
    css`
      :host(:not([pristine]):invalid) .otp-input,
      :host(:not([pristine])) .otp-input:invalid,
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) .otp-input:invalid {
        border-color: var(--uui-color-danger);
      }

      #otp-input-group {
        display: flex;
        gap: var(--uui-input-otp-gap, 0.5em);
        border: 0; /* Reset fieldset */
        padding: 0; /* Reset fieldset */
        margin: 0; /* Reset fieldset */
      }

      .otp-input {
        box-sizing: border-box;
        width: var(--uui-input-otp-size, 3em);
        height: var(--uui-input-otp-size, 3em);
        text-align: center;
        font-size: 1.5em;
      }
    `,
  ];
}
