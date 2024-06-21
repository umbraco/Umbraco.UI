import {
  LabelMixin,
  UUIFormControlMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUIInputEvent, type InputType } from '@umbraco-ui/uui-input/lib';

import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';

/**
 * @element uui-input-otp
 */
@defineElement('uui-input-otp')
export class UUIInputOtpElement extends UUIFormControlMixin(
  LabelMixin('', LitElement),
  '',
) {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   */
  static readonly formAssociated = true;

  /**
   * Accepts only numbers
   * @default false
   * @attr
   */
  @property({ type: Boolean, attribute: 'integer-only' })
  set integerOnly(value: boolean) {
    this.inputMode = value ? 'numeric' : 'text';
  }
  get integerOnly() {
    return this.inputMode === 'numeric';
  }

  /**
   * If true, the input will be masked
   * @default false
   * @attr
   */
  @property({ type: Boolean })
  set masked(value: boolean) {
    this._input = value ? 'password' : 'text';
  }
  get masked() {
    return this._input === 'password';
  }

  /**
   * Set to true to make this input readonly.
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Set to true to disable this input.
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set to true to autofocus this input.
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'autofocus' })
  autoFocus = false;

  /**
   * Add a placeholder to the inputs in the group
   * @remark The placeholder should be a string with the same length as the `length` attribute and will be distributed to each input in the group
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  /**
   * The autocomplete attribute specifies whether or not an input field should have autocomplete enabled.
   * @remark Set the autocomplete attribute to "one-time-code" to enable autofill of one-time-code inputs
   * @attr
   * @default ''
   * @type {string}
   */
  @property({ type: String, reflect: true })
  autocomplete?: string;

  set value(value: string) {
    this._tokens = value.split('');

    super.value = value;
    this.dispatchEvent(new UUIInputEvent(UUIInputEvent.CHANGE));
  }

  /**
   * The number of characters in the input
   * @default 6
   * @attr
   */
  @property({ type: Number })
  length = 6;

  @state()
  _input: InputType = 'text';

  @state()
  _tokens: string[] = [];

  constructor() {
    super();
    this.addEventListener('paste', this.onPaste);
  }

  protected getFormElement(): HTMLElement | null | undefined {
    return this.shadowRoot?.querySelector('.otp-input');
  }

  protected onFocus(event: FocusEvent) {
    (event.target as HTMLInputElement)?.select();
    this.dispatchEvent(event);
  }

  protected onBlur(event: FocusEvent) {
    this.dispatchEvent(event);
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
      const pastedCode = paste.substring(0, this.length + 1);

      if (!this.integerOnly || !isNaN(pastedCode as any)) {
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
        .value=${this._tokens[index] || ''}
        .placeholder=${this.placeholder.charAt(index) || ''}
        type=${this._input}
        inputmode=${this.inputMode}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        ?autofocus=${this.autoFocus && index === 0}
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
        border: 0; /* Reset fieldset */
      }

      .otp-input {
        width: 3em;
        height: 3em;
        text-align: center;
        font-size: 1.5em;
        margin-right: 0.5em;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-otp': UUIInputOtpElement;
  }
}
