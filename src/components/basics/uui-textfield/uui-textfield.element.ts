import { LitElement, html, css, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export type TextFieldType =
  | 'text'
  | 'search'
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
 *  @element uui-textfield
 */
export class UUITextFieldElement extends LitElement {
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
      .invalid {
        border-color: var(--uui-color-danger-background);
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
    `,
  ];

  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  @property()
  label = '';

  @property({})
  placeholder = '';

  @property({ type: Boolean })
  disabled = false;

  firstUpdated() {
    if (!this.label) {
      console.warn(this.tagName + ' needs a `label`');
    }
  }

  private _value: FormDataEntryValue = '';

  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    this.valid = !!this.value;
    if (this.valid) {
      this._internals.setValidity({});
    } else {
      this._internals.setValidity({ customError: true }, 'Cannot be empty');
    }
    this._internals.setFormValue(this._value);
  }

  @property({ type: String }) type: TextFieldType = 'text';

  @property({ type: Boolean })
  private valid = true;

  private onUpdate(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  render() {
    return html`
      <input
        type="${this.type}"
        value=${this.value}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        class=${classMap({ invalid: !this.valid })}
        @change=${(e: Event) => this.onUpdate(e)}
        @keyup=${(e: Event) => this.onUpdate(e)}
      />
    `;
  }
}
