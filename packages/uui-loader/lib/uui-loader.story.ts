import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Loaders/Loader',
  component: 'uui-loader',
  id: 'uui-loader',
  parameters: {
    docs: {
      source: {
        code: `<uui-loader></uui-loader>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-loader style="color: ${props.color}"></uui-loader>`;
Overview.args = { color: 'black' };
Overview.argTypes = {
  color: { table: { category: 'inline styling' } },
};
