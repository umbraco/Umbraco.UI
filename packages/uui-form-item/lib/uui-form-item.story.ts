import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-form/lib';

export default {
  id: 'uui-form-item',
  title: 'Input/Form Item',
  component: 'uui-form-item',
};

export const Overview: Story = () => html` <form
  is="uui-form"
  style="max-width: 800px;">
  <uui-form-item label="Checkbox label">
    <uui-checkbox
      name="checkbox"
      value="Bike"
      label="This is my checked checkbox"
      required>
      This is my checked checkbox
    </uui-checkbox>

    <input
      name="nativeCheckbox"
      label="Native input text"
      type="checkbox"
      value="NativeCheckboxValue"
      placeholder="native text input"
      required />

    <uui-input
      type="password"
      name="password"
      value="MyPassword"
      label="Password"
      required>
    </uui-input>
  </uui-form-item>

  <uui-button type="submit" label="Submit" look="positive"> Submit </uui-button>

  <uui-button type="reset" label="Reset" look="secondary"> Reset </uui-button>
</form>`;
