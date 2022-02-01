import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-form/lib/index';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-slider/lib';
import '@umbraco-ui/uui-radio/lib';
import '@umbraco-ui/uui-toggle/lib';

export default {
  id: 'uui-form',
  title: 'Form',
  component: 'uui-form',
  parameters: {
    docs: {
      source: {
        code: `<uui-form></uui-form>`,
      },
    },
  },
};

export const Overview: Story = () => html` <uui-form>
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
    <uui-radio-group name="radio" label="This is my radio" required>
      <uui-radio value="radio1" label="radio1" name="radio1">Label</uui-radio>
      <uui-radio value="radio2" label="radio2" name="radio2">Label</uui-radio>
      <uui-radio value="radio3" label="radio3" name="radio3">Label</uui-radio>
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
  <div>
    <uui-button type="submit" label="Submit" look="positive">
      Submit
    </uui-button>

    <uui-button type="reset" label="Reset" look="secondary"> Reset </uui-button>
  </div>
</uui-form>`;
