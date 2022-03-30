import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-form/lib/index';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-slider/lib';
import '@umbraco-ui/uui-radio/lib';
import '@umbraco-ui/uui-toggle/lib';
import { UUIRadioGroupEvent } from '@umbraco-ui/uui-radio/lib/UUIRadioGroupEvent';

export default {
  id: 'uui-form',
  title: 'Inputs/Form/Form',
  component: 'uui-form',
};

const _onRadioGroupChanged = (e: UUIRadioGroupEvent) => {
  e.target.error = e.target.value !== 'radio2';
};

const _onSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  console.log('SUBMIT', e);

  const form = e.target as HTMLFormElement;
  const isValid = form.checkValidity();

  if (!isValid) {
    return;
  }

  const formData = new FormData(form);

  for (const value of formData.values()) {
    console.log(value);
  }
};

// TODO: Find a good way to have stories with both HTML and javascript
export const Overview: Story = () => {
  return html`
    <uui-form>
      <form id="MyForm" @submit="${_onSubmit}">
        <uui-form-layout-item>
          <uui-label slot="label" required>Checkbox</uui-label>
          <uui-checkbox
            name="checkbox"
            value="Bike"
            label="This is my checked checkbox"
            required>
            This is my checked checkbox
          </uui-checkbox>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label slot="label" required>Toggle</uui-label>
          <uui-toggle name="toggle" label="This is my toggle" required>
            This is my toggle
          </uui-toggle>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label slot="label" required>Radio Group</uui-label>
          <uui-radio-group
            name="radio"
            label="This is my radio"
            required
            @change=${_onRadioGroupChanged}>
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
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label slot="label" required>Email</uui-label>
          <uui-input
            name="email"
            type="email"
            label="Email"
            required></uui-input>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label slot="label" required>Password</uui-label>
          <uui-input-password name="password" label="Password" required>
          </uui-input-password>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label slot="label" required>Slider</uui-label>
          <uui-slider
            label="Slider"
            name="slider"
            value="5.5"
            min="0"
            max="10"
            step="1"
            required>
          </uui-slider>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label slot="label" required>Textarea</uui-label>
          <uui-textarea
            label="Textarea"
            name="textarea"
            value="Some long text that needs more space"
            minlength="10"
            maxlength="30"
            required>
          </uui-textarea>
        </uui-form-layout-item>

        <div>
          <uui-button type="reset" label="Reset" look="secondary"
            >Reset</uui-button
          >
          <uui-button type="submit" label="Submit" look="positive">
            Submit
          </uui-button>
        </div>
      </form>
    </uui-form>

    <!-- Submit Handler
  const form = document.getElementById('MyForm');

  form.addEventHandler('submit', (e) => {
    e.preventDefault();

    const isValid = form.checkValidity();

    if (!isValid) {
      return;
    }

    const formData = new FormData(form);

    for (const value of formData.values()) {
      console.log(value);
    }
  });
  -->
  `;
};
