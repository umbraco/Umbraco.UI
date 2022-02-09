import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-form-item',
  title: 'Form Item',
  component: 'uui-form-item',
};

export const Overview: Story = () => html`<uui-form-item></uui-form-item>`;
