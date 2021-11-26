import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  id: 'uui-ref-node-document-type',
  title: 'Displays/Refs/Document Type',
  component: 'uui-ref-node-document-type',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-document-type></uui-ref-node-document-type>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-ref-node-document-type></uui-ref-node-document-type>`;
