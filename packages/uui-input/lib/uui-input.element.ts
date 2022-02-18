import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
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
@defineElement('uui-input')
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

      :host(:not([pristine]):invalid),
      /* polyfill support */
      :host(:not([pristine])[internals-invalid]) {
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
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

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

  @query('#input')
  _input!: HTMLInputElement;

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
    this._input.focus();
  }

  protected getFormElement(): HTMLElement {
    return this._input;
  }

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

    // TODO: Do we miss an input event?
  }

  private _onChange() {
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
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        @input=${this._onInput}
        @change=${this._onChange} />
      ${this.renderAppend()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input': UUIInputElement;
  }
}
