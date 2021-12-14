import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-symbol-more/lib/index';

export default {
  id: 'uui-symbol-more',
  title: 'Symbols/More',
  component: 'uui-symbol-more',
  parameters: {
    docs: {
      source: {
        code: `<uui-symbol-more></uui-symbol-more>`,
      },
    },
  },
};

export const Overview: Story = () => html` <uui-symbol-more></uui-symbol-more>`;
