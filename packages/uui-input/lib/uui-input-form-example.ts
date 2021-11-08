import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { UUIInputElement } from './uui-input.element';
import '@umbraco-ui/uui-checkbox/lib';

@customElement('uui-input-example-element')
export class UUIInputInFormExampleElement extends LitElement {

  static styles = css`
    #nativeInput:invalid {
      border: 1px solid red;
    }
  `;

  @query('form')
  _form: HTMLFormElement | undefined;

  @query('#nativeInput')
  _nativeInputElement: HTMLInputElement | undefined;

  @query('#email')
  _emailElement: UUIInputElement | undefined;

  @query('#password')
  _passwordElement: UUIInputElement | undefined;

  private _showValidation;
  private _customValidationInputIsInvalid;

  _onEmailInput (event: any) {
    console.log('EMAIL', event);
    const value = event?.target?.value || '';

    /*
    if (this._emailElement) {
      this._emailElement.error = this._validateEmail(value);
    }
    */
  }

  _onPasswordInput (event: Event) {
    console.log('PASSWORD', event);
  }

  _onCustomValidationInput (event: InputEvent) {
    const target = event.target as UUIInputElement;
    this._customValidationInputIsInvalid = !this._myCustomValidation(target.value);
    this.requestUpdate();
  }

  _myCustomValidation (value: string) {
    return value === 'test';
  }

  _validateEmail (email: string) {
    return email === '';
  }

  _onSubmit (event: Event) {
    event.preventDefault();

    if (!this._form) {
      return;
    }

    this._showValidation = true;

    this.requestUpdate();

    console.log('IS VALID', this._form.checkValidity());

    /*
    const formData = new FormData(this._form);

    console.log('IS VALID', this._form.checkValidity());

    const nativeIsValid = this._nativeInputElement?.checkValidity();
    const emailIsValid = this._emailElement?.checkValidity();
    const passwordIsValid = this._passwordElement?.checkValidity();

    if (this._emailElement?.value === '') {
      this._emailElement.error = true;
    }

    for (const value of formData.values()) {
      console.log(value);
    }
    */
  }

  _onReset (event: Event) {
    console.log('RESET', event);
    this._showValidation = false;
    this.requestUpdate();
  }

  connectedCallback () {
    super.connectedCallback();
    
    this._showValidation = false;
    this._customValidationInputIsInvalid = !this._myCustomValidation('');
  }

  render() {
    return html`
      <!-- novalidate -->
      <form @submit="${this._onSubmit}" @reset="${this._onReset}" novalidate>

        <!--
        <div>
          <label style="display: block;">Number</label>
          <input type="number" id="nativeNumber" name="nativeNumber" value="" min="5" max="10" required />
        </div>

        <div>
          <input id="nativeCheckbox" type="checkbox" value="" required />
        </div>

        <div>
          <uui-checkbox id="checkbox" value="" required></uui-checkbox>
        </div>
        -->

        <div>
          <label style="display: block;">Text</label>
          <input type="text" id="nativeInput" name="native" value="" required />
        </div>

        <div style="margin-bottom: 10px;">
          <uui-input 
            id="email" 
            name="email" 
            value="" 
            type="text" 
            @input="${this._onEmailInput}" 
            label="Email" 
            required
            ?showvalidation="${this._showValidation}">
          </uui-input>
        </div>

        <div style="margin-bottom: 10px;">
          <uui-input
            type="password"
            id="password"
            name="password"
            @input="${this._onPasswordInput}"
            label="Password"
            required
            ?showvalidation="${this._showValidation}">
          </uui-input>
        </div>

        <div style="margin-bottom: 10px;">
          <uui-input
            type="text"
            id="customValidation"
            name="customValidation"
            @input="${this._onCustomValidationInput}"
            label="customValidation"
            ?error="${this._customValidationInputIsInvalid}">
          </uui-input>
        </div>

        <div>
          <uui-button
            type="submit"
            label="Submit"
            look="positive">
            Submit
          </uui-button>

          <uui-button
            type="reset"
            label="Reset"
            look="secondary">
            Reset
          </uui-button>
        </div>
      </form>
    `;
  }
}