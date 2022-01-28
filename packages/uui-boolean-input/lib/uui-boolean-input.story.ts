import './define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-boolean-input',
  title: 'Boolean Input',
  component: 'uui-boolean-input',
  parameters: {
    docs: {
      source: {
        code: `<uui-boolean-input></uui-boolean-input>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-boolean-input></uui-boolean-input>`;
