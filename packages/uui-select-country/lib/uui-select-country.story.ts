import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-select-country',
  title: 'Select Country',
  component: 'uui-select-country',
  parameters: {
    docs: {
      source: {
        code: `<uui-select-country></uui-select-country>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-select-country></uui-select-country>`;
