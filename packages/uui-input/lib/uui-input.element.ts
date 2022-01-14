import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
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
export class UUIInputElement extends LitElement {
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
        outline: none;
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
      :host(:focus-within) {
        border-color: var(
          --uui-input-border-color-focus,
          var(--uui-interface-border-focus)
        );
      }
      :host([error]) {
        border-color: var(--uui-look-danger-border);
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
        outline: none;
        text-align: inherit;
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
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    (this.shadowRoot?.querySelector('#input') as any).focus();
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
    this._value = newValue;
    if (
      'ElementInternals' in window &&
      //@ts-ignore
      'setFormValue' in window.ElementInternals.prototype
    ) {
      this._internals.setFormValue(this._value);
    }
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
   * Set to true if the component should have an error state.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * This property specifies the type of input that will be rendered.
   * @type {'text' | 'tel'| 'url'| 'email'| 'password'| 'date'| 'month'| 'week'| 'time'| 'datetime-local'| 'number'| 'color'}
   * @attr
   * @default text
   */
  @property({ type: String })
  private _type: InputType = 'text';
  public get type(): InputType {
    return this._type;
  }
  public set type(value: InputType) {
    this._type = value;
  }

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  private onChange() {
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
