import { iconSee, iconUnsee } from '../icon-registry-essential/svgs/index.js';
import type { InputType } from '../input/input.js';
import { UUIInputElement } from '../input/input.js';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

import '../icon/icon.js';
import '../button/button.js';

/**
 * @element uui-input-password
 * @extends uui-input
 */
export class UUIInputPasswordElement extends UUIInputElement {
  @state()
  private passwordType: InputType = 'password';

  // this overrides the inherited type property, and moves the input's type handling to the passwordType state.
  @property()
  get type() {
    return this.passwordType;
  }
  set type(newValue) {
    this.passwordType = newValue;
  }

  _onPasswordToggle() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute('spellcheck')) {
      this.spellcheck = false;
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
      compact
      label="${this.passwordType === 'password'
        ? 'Show password'
        : 'Hide password'}"
      id="eye">
      ${this.renderIcon()}
    </uui-button>`;
  }

  static override readonly styles = [
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
}
