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
 * @fires UUIInputEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 */
export class UUIInputElement extends LitElement {
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
      :host([invalid]) {
        border-color: var(--uui-color-danger-background);
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

      :host([error]) input {
        border: 1px solid var(--uui-look-danger-border);
      }

      :host([error]) input[disabled] {
        border: 1px solid var(--uui-look-danger-border);
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
  type: InputType = 'text';

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
    this.dispatchEvent(
      new UUIInputEvent(UUIInputEvent.CHANGE, { bubbles: true })
    );
  }

  render() {
    return html`
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
    `;
  }
}
