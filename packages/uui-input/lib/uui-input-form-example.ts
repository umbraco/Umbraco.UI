import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { UUIInputElement } from './uui-input.element';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-slider/lib';
import '@umbraco-ui/uui-radio/lib';
import '@umbraco-ui/uui-toggle/lib';

@customElement('uui-input-example-element')
export class UUIInputInFormExampleElement extends LitElement {
  static styles = css`
    #nativeInput:invalid {
      border: 1px solid red;
    }

    uui-input {
      width: 100%;
    }

    form {
      max-width: 600px;
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

  private _showValidation = false;
  private _customValidationInputIsInvalid = false;

  _onEmailInput(event: any) {
    console.log('EMAIL', event);
    const value = event?.target?.value || '';

    /*
    if (this._emailElement) {
      this._emailElement.error = this._validateEmail(value);
    }
    */
  }

  _onPasswordInput(event: Event) {
    console.log('PASSWORD', event);
  }

  _onCustomValidationInput(event: InputEvent) {
    const target = event.target as UUIInputElement;
    this._customValidationInputIsInvalid = !this._myCustomValidation(
      target.value
    );
    this.requestUpdate();
  }

  _myCustomValidation(value: FormDataEntryValue) {
    return value === 'test';
  }

  _validateEmail(email: string) {
    return email === '';
  }

  _onSubmit(event: Event) {
    event.preventDefault();

    if (!this._form) {
      return;
    }

    this._showValidation = true;

    this.requestUpdate();

    console.log('IS VALID', this._form.checkValidity());

    const formData = new FormData(this._form);

    this._showValidation = true;

    const nativeCheckboxValue = formData.get('nativeCheckbox');
    const uuiSliderValue = formData.get('slider');
    const radioGroup = formData.get('myRadioGroup');

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

  _onReset(event: Event) {
    console.log('RESET', event);
    this._showValidation = false;
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();

    this._showValidation = false;
    this._customValidationInputIsInvalid = !this._myCustomValidation('');
  }

  render() {
    return html`
      <form
        @submit="${this._onSubmit}"
        @reset="${this._onReset}"
        ?show-validation=${this._showValidation}
        novalidate>
        <div style="margin-bottom: 15px;">
          <uui-checkbox
            id="checkbox"
            name="checkbox"
            value="Bike"
            label="This is my checkbox"
            required>
            Hello
          </uui-checkbox>
        </div>

        <div style="margin-bottom: 15px;">
          <uui-toggle
            id="toggle"
            name="toggle"
            label="This is my toggle"
            required>
            This is my toggle
          </uui-toggle>
        </div>

        <div style="margin-bottom: 15px;">
          <uui-input
            id="email"
            name="email"
            value=""
            type="text"
            label="Email"
            @input="${this._onEmailInput}"
            required>
          </uui-input>
        </div>

        <div style="margin-bottom: 15px;">
          <uui-input
            type="password"
            id="password"
            name="password"
            label="Password"
            @input="${this._onPasswordInput}"
            required>
          </uui-input>
        </div>

        <div style="margin-bottom: 15px;">
          <uui-input
            type="text"
            id="customValidation"
            name="customValidation"
            label="Custom Validation"
            placeholder="Write 'test'..."
            @input="${this._onCustomValidationInput}"
            ?error="${this._customValidationInputIsInvalid}">
          </uui-input>
        </div>

        <div style="margin-bottom: 15px;">
          <uui-slider
            label="Slider"
            id="slider"
            name="slider"
            value=""
            min="0"
            max="10"
            step="1"
            required>
          </uui-slider>
        </div>

        <div style="margin-bottom: 30px;">
          <uui-radio-group label="Radio group" name="myRadioGroup" required>
            <uui-radio value="Value 1">Option 1</uui-radio>
            <uui-radio value="Value 2">Option 2</uui-radio>
            <uui-radio value="Value 3">Option 3</uui-radio>
            <uui-radio value="Value 4">Option 4</uui-radio>
          </uui-radio-group>
        </div>

        <div>
          <uui-button type="submit" label="Submit" look="positive">
            Submit
          </uui-button>

          <uui-button type="reset" label="Reset" look="secondary">
            Reset
          </uui-button>
        </div>
      </form>
    `;
  }
}
