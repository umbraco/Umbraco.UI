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
    uui-input {
      width: 100%;
    }

    form {
      max-width: 600px;
    }
  `;

  @query('form')
  _form: HTMLFormElement | undefined;

  _onSubmit(event: Event) {
    event.preventDefault();

    if (!this._form) {
      return;
    }

    const isValid = this._form.checkValidity();

    if (!isValid) {
      console.log('not valid form.');
      this._showValidation(true);
      return;
    }
    console.log('valid form.');
    this._showValidation(false);

    const formData = new FormData(this._form);

    console.log('----SUBMITTED----');

    for (const value of formData.values()) {
      console.log(value);
    }
  }

  _onReset(event: Event) {
    console.log('RESET', event);
  }

  private _showValidation(show: boolean) {
    if (!this._form) {
      return;
    }
    const inputs = Array.from(this._form.elements);
    inputs.forEach(el => {
      if ((el as any).showValidation !== undefined) {
        (el as any).showValidation = show;
      }
    });
  }

  private _customValidationInputIsInvalid = false;

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

  connectedCallback() {
    super.connectedCallback();
    this._customValidationInputIsInvalid = !this._myCustomValidation('');
  }

  render() {
    return html`
      <form @submit="${this._onSubmit}" @reset="${this._onReset}" novalidate>
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
          <uui-input id="email" name="email" type="text" label="Email" required>
          </uui-input>
        </div>

        <div style="margin-bottom: 15px;">
          <uui-input
            type="password"
            id="password"
            name="password"
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
            id="slider"
            name="slider"
            value=""
            min="0"
            max="10"
            step="1"
            required>
          </uui-slider>
        </div>

        <!--
        <div style="margin-bottom: 30px;">
          <uui-radio-group label="Radio group" name="myRadioGroup" required>
            <uui-radio value="Value 1">Option 1</uui-radio>
            <uui-radio value="Value 2">Option 2</uui-radio>
            <uui-radio value="Value 3">Option 3</uui-radio>
            <uui-radio value="Value 4">Option 4</uui-radio>
          </uui-radio-group>
        </div>
        -->

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
