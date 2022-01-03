import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-input-password/lib/index';

export default {
  id: 'uui-input-password',
  title: 'Input Password',
  component: 'uui-input-password',
  parameters: {
    docs: {
      source: {
        code: `<uui-input-password></uui-input-password>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-input-password></uui-input-password>`;
