import { LitElement, html, css, property, query } from 'lit-element';
import { UUIRadioChangeEvent } from '../../../event/UUIRadioChangeEvent';
/**
 *  @element uui-radio
 *  @slot - for label
 *
 */

export class UUIRadioElement extends LitElement {
  static styles = [css``];

  @query('#input')
  private inputElement!: HTMLInputElement;

  @property({ type: String, reflect: true })
  public name = '';

  @property({ type: String, reflect: true })
  public value = '';

  @property({ type: Boolean, reflect: true })
  public checked = false;

  private _onChange() {
    this.checked = this.inputElement.checked;
    this.dispatchEvent(new UUIRadioChangeEvent());
  }

  render() {
    return html` <input
        id="input"
        aria-labelledby="label"
        type="radio"
        name=${this.name}
        value=${this.value}
        .checked=${this.checked}
        @change=${this._onChange}
      />
      <span id="button"></span>
      <label id="label"><slot></slot></label>`;
  }
}
