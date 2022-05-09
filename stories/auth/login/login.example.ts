import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('uui-login-example')
export class UUILoginExample extends LitElement {
  static styles: CSSResultGroup = [
    UUITextStyles,
    css`
      #email,
      #password {
        width: 100%;
      }
    `,
  ];

  @state()
  private _loggingIn: boolean = false;

  private _handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form) return;

    const isValid = form.checkValidity();
    if (!isValid) return;

    const formData = new FormData(form);

    const username = formData.get('email') as string;
    const password = formData.get('password') as string;
    const persist = formData.has('persist');

    this._login(username, password, persist);
  };

  private _login(username: string, password: string, persist: boolean) {
    console.log('LOGIN', username, password, persist);
    this._loggingIn = true;
    setTimeout(() => {
      this._loggingIn = false;
    }, 1000);
  }

  private _greetings: Array<string> = [
    'Happy super Sunday',
    'Happy manic Monday',
    'Happy tubular Tuesday',
    'Happy wonderful Wednesday',
    'Happy thunderous Thursday',
    'Happy funky Friday',
    'Happy Caturday',
  ];

  @state()
  private _greeting: string = this._greetings[new Date().getDay()];

  render() {
    return html`
      <div class="uui-text">
        <h1 class="uui-h3">${this._greeting}</h1>
        <uui-form>
          <form id="LoginForm" name="login" @submit="${this._handleSubmit}">
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

            <uui-form-layout-item>
              <uui-label for="password" slot="label" required
                >Password</uui-label
              >
              <uui-input-password
                id="password"
                name="password"
                placeholder="Enter your password..."
                required
                required-message="Password is required"></uui-input-password>
            </uui-form-layout-item>

            <uui-form-layout-item>
              <uui-checkbox name="persist" label="Remember me">
                Remember me
              </uui-checkbox>
            </uui-form-layout-item>

            <uui-button
              type="submit"
              label="Login"
              look="positive"
              state=${ifDefined(
                this._loggingIn ? 'waiting' : undefined
              )}></uui-button>
            <uui-button type="button" label="Forgot Password?"></uui-button>
          </form>
        </uui-form>
      </div>
    `;
  }
}
