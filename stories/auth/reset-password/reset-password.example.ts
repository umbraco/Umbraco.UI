import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';

@customElement('uui-reset-password-example')
export class UUIResetPasswordExample extends LitElement {
  static styles: CSSResultGroup = [
    UUITextStyles,
    css`
      #email {
        width: 100%;
      }
    `,
  ];

  private _handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log(e);
  };

  render() {
    return html`
      <div class="uui-text">
        <h1 class="uui-h3">Reset password</h1>
        <p>
          An email will be sent to the address specified with a link to reset
          your password
        </p>
        <uui-form>
          <form
            id="ResetPasswordForm"
            name="resetPassword"
            @submit="${this._handleSubmit}">
            <uui-form-layout-item>
              <uui-label for="email" slot="label" required>Email</uui-label>
              <uui-input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email..."
                required
                required-message="Email is required"></uui-input>
            </uui-form-layout-item>

            <uui-button
              type="submit"
              label="Reset password"
              look="positive"></uui-button>
            <uui-button type="button" label="Return to login"></uui-button>
          </form>
        </uui-form>
      </div>
    `;
  }
}
