import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-list-item-document-type/lib/index';

export default {
  id: 'uui-list-item-document-type',
  title: 'Displays/List Item/Document Type',
  component: 'uui-list-item-document-type',
  parameters: {
    docs: {
      source: {
        code: `<uui-list-item-document-type></uui-list-item-document-type>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-list-item-document-type></uui-list-item-document-type>`;
