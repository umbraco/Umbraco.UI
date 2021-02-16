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
        height: 32px;
        padding: 4px 6px;
        margin-bottom: 10px;
        font-size: 15px;
        line-height: 20px;
        color: inherit;
        border-radius: 0;
        vertical-align: middle;
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
    `,
  ];

  static formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  //! type of this should probably be FormDataEntryValue, and initialized as ''
  private _value: string | null = null;

  @property()
  get value(): string | null {
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

  @property()
  private valid = true;

  private onUpdate(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  render() {
    return html`
      <input
        type="${this.type}"
        value=${this.value}
        class=${classMap({ invalid: !this.valid })}
        @change=${(e: Event) => this.onUpdate(e)}
        @keyup=${(e: Event) => this.onUpdate(e)}
      />
    `;
  }
}
