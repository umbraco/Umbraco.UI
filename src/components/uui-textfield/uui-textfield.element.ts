import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators';
import { LabelMixin } from '../../mixins/LabelMixin';
import { UUITextFieldEvent } from './UUITextFieldEvent';

export type TextFieldType =
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
 * @element uui-textfield
 * @extends LabelMixin(LitElement)
 * @slot textfield label - for the input label text.
 * @description - Custom element wrappicng the native <input> element.
 * @fires UUITextFieldEvent#change on change
 * @fires UUITextFieldEvent#input on input
 * @fires UUITextFieldEvent#keyup on keyup
 */
export class UUITextFieldElement extends LabelMixin(
  'textfield label',
  LitElement
) {
  static styles = [
    css`
      :host {
        display: inline-block;
      }
      input {
        display: inline-block;
        height: 30px;
        padding: 3px 6px 1px 6px;
        font-family: inherit;
        font-size: 15px;
        color: inherit;
        border-radius: 0;
        box-sizing: border-box;
        background-color: var(
          --uui-text-field-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-text-field-border-color, var(--uui-interface-border));
        width: 100%;
        outline: none;
      }
      input:hover {
        border-color: var(
          --uui-text-field-border-color-hover,
          var(--uui-interface-border-hover)
        );
      }
      input:focus {
        border-color: var(
          --uui-text-field-border-color-focus,
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
        margin-left: var(--uui-size-base-unit, 6px);
      }

      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      input[disabled] {
        background-color: var(
          --uui-text-field-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        border: 1px solid
          var(
            --uui-text-field-border-color-disabled,
            var(--uui-interface-border-disable)
          );

        color: var(--uui-interface-contrast-disabled);
      }

      :host([disabled]) .label {
        color: var(--uui-interface-contrast-disabled);
      }

      .label {
        font-size: var(--uui-type-small-size, 12px);
        line-height: calc(var(--uui-size-base-unit) * 3);
      }
    `,
  ];

  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  /**
   * Defins the input placeholder.
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
   * This is a value property of the uui-textfield.
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
    this._internals.setFormValue(this._value);
  }

  /**
   * This is a name property of the uui-textfield component. It reflects the behaviour of the native <input> element and its name attribute.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * Set to true if the component should have an error state.Property is reflected to the coresponding attribute.
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
   * @default false
   */
  @property({ type: String })
  type: TextFieldType = 'text';

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new UUITextFieldEvent(UUITextFieldEvent.INPUT));
  }

  private onChange() {
    this.dispatchEvent(new UUITextFieldEvent(UUITextFieldEvent.CHANGE));
  }

  private onKeyup() {
    this.dispatchEvent(new UUITextFieldEvent(UUITextFieldEvent.KEYUP));
  }

  render() {
    return html`
      <input
        .type=${this.type}
        .value=${this.value}
        .name=${this.name}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @input=${this.onInput}
        @change=${this.onChange}
        @keyup=${this.onKeyup}
      />
      ${this.hideLabel === false ? this.renderLabel() : ''}
    `;
  }
}
