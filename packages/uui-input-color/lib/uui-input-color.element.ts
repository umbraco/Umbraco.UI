import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { css, html } from 'lit';
import { InputType, UUIInputElement } from '@umbraco-ui/uui-input/lib';
import { property, state } from 'lit/decorators.js';

/**
 * @element uui-input-color
 * @extends uui-input
 */
@defineElement('uui-input-color')
export class UUIInputColorElement extends UUIInputElement {
  @state()
  private inputType: InputType = 'color';

  // this overrides the inherited type property, and moves the input's type handling to the passwordType state.
  @property()
  get type() {
    return this.inputType;
  }
  set type(newValue) {
    this.inputType = newValue;
  }

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-color-swatch');
  }

  renderPrepend() {
    return html`<uui-color-swatch
      .disabled=${this.disabled}
      .readonly=${this.readonly}
      .value=${this.value}>
    </uui-color-swatch>`;
  }

  static styles = [...UUIInputElement.styles, css``];

  /*render(){
      return html`
          <div class="color-wrapper">
            <uui-input id="input" label="Value" placeholder="Value" required style="--uui-show-focus-outline: 0;">
              <uui-color-swatch slot="prepend" label="" value="#"></uui-color-swatch>
            </uui-input>
            <input type="color" id="color" aria-hidden="true" value="">
          </div>`;
  }*/
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-color': UUIInputColorElement;
  }
}
