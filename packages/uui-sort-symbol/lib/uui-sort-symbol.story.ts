import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-sort-symbol/lib/index';

export default {
  id: 'uui-sort-symbol',
  title: 'Symbols/Sort Symbol',
  component: 'uui-sort-symbol',
  parameters: {
    docs: {
      source: {
        code: `<uui-sort-symbol></uui-sort-symbol>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-sort-symbol sort=${props.sort}></uui-sort-symbol>`;
