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

  _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  _v: string | null = null;
  @property()
  get value(): string | null {
    return this._v;
  }
  set value(newValue) {
    this._v = newValue;
    this.valid = !!this.value;
    if (this.valid) {
      this._internals.setValidity({});
    } else {
      this._internals.setValidity({ customError: true }, 'Cannot be empty');
    }
    this._internals.setFormValue(this._v);
  }

  @property()
  valid = true;

  onUpdate(e) {
    this.value = e.target.value;
  }

  render() {
    return html`
      <input
        type="text"
        value=${this.value}
        class=${classMap({ invalid: !this.valid })}
        @change=${e => this.onUpdate(e)}
        @keyup=${e => this.onUpdate(e)}
      />
    `;
  }
}
