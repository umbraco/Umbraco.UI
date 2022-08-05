import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-form/lib';
import '@umbraco-ui/uui-label/lib';

export default {
  id: 'uui-form-layout-item',
  title: 'Inputs/Form/Form Layout Item',
  component: 'uui-form-layout-item',
};

export const AAAOverview: Story = () => html`
  <uui-form-layout-item>
    Form layout item is a layout component, use the properties and slots to
    append content/components of interest. See the following stories for
    examples.
  </uui-form-layout-item>
`;
AAAOverview.storyName = 'Overview';

export const Example: Story = () => html` <uui-form>
  <form style="max-width: 800px;">
    <uui-form-layout-item>
      <uui-label slot="label" for="phoneInput" required>Phone number</uui-label>
      <span slot="description"
        >Form item accepts a description, keep it short.</span
      >
      <div>
        <uui-input
          id="phoneInput"
          type="text"
          name="phone"
          placeholder="+00"
          label="phone area code"
          required
          required-message="You must enter a area code"
          style="text-align:right; width: 75px;">
        </uui-input>
        <uui-input
          type="text"
          name="phone"
          placeholder=""
          label="phone number"
          required
          required-message="You must enter a phone number">
        </uui-input>
      </div>
    </uui-form-layout-item>
    <uui-form-layout-item>
      <uui-label slot="label" for="cityinput">City</uui-label>
      <span slot="description"></span>
      <div>
        <uui-input
          id="cityinput"
          type="text"
          name="city"
          placeholder=""
          label="city"
          required
          required-message="You must enter a city">
        </uui-input>
      </div>
    </uui-form-layout-item>
    <uui-form-layout-item>
      <div>
        <uui-input
          type="text"
          name="postal"
          placeholder=""
          label="postal number"
          required
          required-message="You must enter a postal number">
        </uui-input>
      </div>
    </uui-form-layout-item>

    <uui-button type="reset" label="Reset" look="secondary"> Reset </uui-button>
    <uui-button type="submit" label="Submit" look="primary" color="positive">
      Submit
    </uui-button>
  </form>
</uui-form>`;
