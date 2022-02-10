import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-form/lib';
import '@umbraco-ui/uui-label/lib';

export default {
  id: 'uui-form-item',
  title: 'Input/Form Item',
  component: 'uui-form-item',
};

export const Overview: Story = () => html`
  <uui-form-item>
    Form item is a layout component, use the slots to append components of
    interest. See the following stories for examples.
  </uui-form-item>
`;

export const MultipleInputs: Story = () => html` <form
  is="uui-form"
  style="max-width: 800px;">
  <uui-form-item>
    <uui-label slot="label" for="phoneInput" required>Phone number</uui-label>
    <div>
      <uui-input
        id="phoneInput"
        type="text"
        name="phone"
        placeholder="+00"
        required
        required-message="You must enter a area code"
        style="text-align:right; width: 75px;">
      </uui-input>
      <uui-input
        type="text"
        name="phone"
        placeholder=""
        required
        required-message="You must enter a phone number">
      </uui-input>
    </div>
  </uui-form-item>

  <uui-button type="submit" label="Submit" look="positive"> Submit </uui-button>

  <uui-button type="reset" label="Reset" look="secondary"> Reset </uui-button>
</form>`;
