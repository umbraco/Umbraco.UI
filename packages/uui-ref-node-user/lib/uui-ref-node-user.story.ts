import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  id: 'uui-ref-node-user',
  title: 'Displays/Refs/User',
  component: 'uui-ref-node-user',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-user></uui-ref-node-user>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-ref-node-user></uui-ref-node-user>`;
