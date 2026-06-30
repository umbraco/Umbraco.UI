import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UUITextStyles } from '../../../src/styles';

@customElement('uui-new-user-password-example')
export class UUINewUserPasswordExample extends LitElement {
  static styles: CSSResultGroup = [
    UUITextStyles,
    css`
      #newPassword,
      #confirmPassword {
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
        <h1 class="uui-h3">Hi</h1>
        <p>
          Hello there and welcome to Umbraco! In just 1 minute you’ll be good to
          go, we just need you to setup a password and add a picture for your
          avatar.
        </p>
        <uui-form>
          <form
            id="NewUserPasswordForm"
            name="newUserPassword"
            @submit="${this._handleSubmit}">
            <uui-form-layout-item>
              <uui-label for="newPassword" slot="label" required
                >New Password</uui-label
              >
              <uui-input-password
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password..."
                required
                required-message="New password is required"></uui-input-password>
            </uui-form-layout-item>

            <uui-form-layout-item>
              <uui-label for="confirmPassword" slot="label" required
                >Confirm Password</uui-label
              >
              <uui-input-password
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password..."
                required
                required-message="New password is required"></uui-input-password>
            </uui-form-layout-item>

            <div style="text-align:right;">
              <uui-button
                type="submit"
                label="Save password"
                look="primary"></uui-button>
            </div>
          </form>
        </uui-form>
      </div>
    `;
  }
}
