import { UUIHorizontalShakeKeyframes } from '@umbraco-ui/uui-base/lib/animations';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';

@defineElement('uui-radio-group-disable-example')
export class UUIRadioGroupDisableExampleElement extends LitElement {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 200px;
      }
    `,
  ];

  @state()
  private _disabled = false;

  render() {
    return html`
      <uui-button
        @click=${() => (this._disabled = !this._disabled)}
        look="primary"
        label="disable group"></uui-button>
      <uui-radio-group .disabled=${this._disabled}>
        <uui-radio value="1">one</uui-radio>
        <uui-radio value="2">two</uui-radio>
        <uui-radio value="3">three</uui-radio>
        <uui-radio value="4">four</uui-radio>
      </uui-radio-group>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-radio-group-disable-example': UUIRadioGroupDisableExampleElement;
  }
}
