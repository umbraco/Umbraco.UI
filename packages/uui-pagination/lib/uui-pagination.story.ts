import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-pagination/lib/index';

export default {
  id: 'uui-pagination',
  title: 'Pagination',
  component: 'uui-pagination',
  parameters: {
    docs: {
      source: {
        code: `<uui-pagination></uui-pagination>`,
      },
    },
  },
};

export const Overview: Story = () => html`<uui-pagination></uui-pagination>`;
