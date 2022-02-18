import { LitElement, html, css } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { UUIInputElement } from './uui-input.element';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-slider/lib';
import '@umbraco-ui/uui-radio/lib';
import '@umbraco-ui/uui-toggle/lib';

@customElement('uui-input-example-element')
export class UUIInputInFormExampleElement extends LitElement {
  static styles = css`
    uui-input {
      width: 100%;
    }

    form {
      max-width: 600px;
    }
  `;

  @query('form')
  _form: HTMLFormElement | undefined;

  private _customValidationInputIsInvalid = false;

  @state()
  showExtraFields: boolean = false;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this._customValidationInputIsInvalid = !this._myCustomValidation('');
  }

  _onSubmit(event: Event) {
    event.preventDefault();

    if (!this._form) {
      return;
    }

    const isValid = this._form.checkValidity();
    if (!isValid) {
      this._form.setAttribute('invalid-submit', '');
      return;
    }

    this._form.removeAttribute('invalid-submit');

    const formData = new FormData(this._form);

    for (const value of formData.values()) {
      console.log(value);
    }
  }

  _onRadioGroupChange(event: InputEvent) {
    const target = event.target as UUIInputElement;
    target.error = target.value !== 'radio2';
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

  renderFormControls() {
    return html`
      <div style="margin-bottom: 15px;">
        <uui-checkbox
          name="checkbox"
          value="Bike"
          label="This is my checked checkbox"
          checked
          required>
          This is my checked checkbox
        </uui-checkbox>
      </div>

      <div style="margin-bottom: 15px;">
        <uui-toggle name="toggle" label="This is my toggle" required>
          This is my toggle
        </uui-toggle>
      </div>

      <div style="margin-bottom: 15px;">
        <uui-radio-group
          name="radio"
          label="This is my radio"
          required
          @change="${this._onRadioGroupChange}">
          <uui-radio value="radio1" label="radio1" name="radio1"
            >Label</uui-radio
          >
          <uui-radio value="radio2" label="radio2" name="radio2"
            >Label</uui-radio
          >
          <uui-radio value="radio3" label="radio3" name="radio3"
            >Label</uui-radio
          >
        </uui-radio-group>
      </div>

      <div style="margin-bottom: 15px;">
        <uui-input name="email" type="text" label="Email" required> </uui-input>
      </div>

      <div style="margin-bottom: 15px;">
        <uui-input
          type="password"
          name="password"
          value="MyPassword"
          label="Password"
          required>
        </uui-input>
      </div>

      <div style="margin-bottom: 15px;">
        <uui-input
          type="text"
          id="customValidation"
          name="customValidation"
          label="Custom Validation"
          placeholder="Write 'test'... custom validation invoked on connectedCallback"
          @input="${this._onCustomValidationInput}"
          ?error="${this._customValidationInputIsInvalid}">
        </uui-input>
      </div>

      <div style="margin-bottom: 15px;">
        <uui-slider
          label="Slider"
          name="slider"
          value="5.5"
          min="0"
          max="10"
          step="1"
          required>
        </uui-slider>
      </div>

      <div style="margin-bottom: 15px;">
        <input
          name="nativeCheckbox"
          label="Native input text"
          type="checkbox"
          value="NativeCheckboxValue"
          placeholder="native text input"
          checked
          required />
      </div>

      <div style="margin-bottom: 15px;">
        <input
          name="nativeInput"
          label="Native input text"
          type="text"
          default-value="default test value"
          value="test value"
          placeholder="native text input"
          required />
      </div>

      <div style="margin-bottom: 15px;">
        <input
          name="nativeInputNumber"
          label="Native input number"
          type="number"
          value=""
          placeholder="native number input"
          min="0"
          max="10"
          required />
      </div>
    `;
  }

  render() {
    return html`
      <form @submit="${this._onSubmit}" novalidate>
        ${this.renderFormControls()}
        ${this.showExtraFields ? this.renderFormControls() : ''}

        <div>
          <uui-button type="submit" label="Submit" look="positive">
            Submit
          </uui-button>

          <uui-button type="reset" label="Reset" look="secondary">
            Reset
          </uui-button>

          <uui-button
            type="button"
            label="Add another"
            look="secondary"
            @click=${() => (this.showExtraFields = true)}>
            Add another
          </uui-button>
        </div>
      </form>
    `;
  }
}
