import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import {
  iconSee,
  iconUnsee,
} from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import { InputType, UUIInputElement } from '@umbraco-ui/uui-input/lib';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 * @element uui-input-password
 */
@defineElement('uui-input-password')
export class UUIInputPasswordElement extends UUIInputElement {
  static styles = [
    ...UUIInputElement.styles,
    css`
      #eye {
        height: 100%;
        margin-left: -6px;
      }

      #clear:hover {
        color: black;
      }
    `,
  ];

  @state()
  private passwordType: InputType = 'password';

  // this overrides the inherited type property, and moves the input's type handling to the passwordType state.
  @property()
  // @ts-ignore
  get type() {
    return this.passwordType;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set type(_newValue) {}

  _onPasswordToggle() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  renderIcon() {
    return this.passwordType === 'password'
      ? html`<uui-icon name="see" .fallback=${iconSee.strings[0]}></uui-icon>`
      : html`<uui-icon
          name="unsee"
          .fallback=${iconUnsee.strings[0]}></uui-icon>`;
  }

  renderAppend() {
    return html`<uui-button
      .disabled=${this.disabled}
      @click=${this._onPasswordToggle}
      style="--uui-button-padding-top-factor: 0; --uui-button-padding-bottom-factor: 0"
      compact
      id="eye">
      ${this.renderIcon()}
    </uui-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-password': UUIInputPasswordElement;
  }
}
