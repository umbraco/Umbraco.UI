import { LitElement, html, css, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

/**
 *  @element uui-input
 */
export class UUIInputElement extends LitElement {
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
        color: #303033;
        border-radius: 0;
        vertical-align: middle;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #d8d7d9;
        width: 100%;
      }
      .invalid {
        border-color: #d42054;
      }
    `,
  ];

  static formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

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

  @property()
  private valid = true;

  private onUpdate(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  render() {
    return html`
      <input
        type="text"
        value=${this.value}
        class=${classMap({ invalid: !this.valid })}
        @change=${(e: Event) => this.onUpdate(e)}
        @keyup=${(e: Event) => this.onUpdate(e)}
      />
    `;
  }
}
