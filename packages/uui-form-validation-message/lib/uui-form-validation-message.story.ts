import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-form-validation-message',
  title: 'Inputs/Form Validation Message',
  component: 'uui-form-validation-message',
  parameters: {
    docs: {
      source: {
        code: `<uui-form-validation-message></uui-form-validation-message>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-form-validation-message></uui-form-validation-message>`;
