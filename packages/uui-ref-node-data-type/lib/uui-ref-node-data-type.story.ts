import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  id: 'uui-ref-node-data-type',
  title: 'Displays/Refs/Data Type',
  component: 'uui-ref-node-data-type',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-data-type></uui-ref-node-data-type>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-ref-node-data-type></uui-ref-node-data-type>`;
