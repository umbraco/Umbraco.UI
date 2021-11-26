import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  id: 'uui-ref-node-member',
  title: 'Displays/Refs/Member',
  component: 'uui-ref-node-member',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-member></uui-ref-node-member>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-ref-node-member></uui-ref-node-member>`;
