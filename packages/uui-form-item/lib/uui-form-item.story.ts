import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

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
      checked
      required>
      This is my checked checkbox
    </uui-checkbox>
  </uui-form-item>
</form>`;
