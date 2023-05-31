import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Loaders/Loader',
  component: 'uui-loader',
  id: 'uui-loader',
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-loader></uui-loader>`,
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const Overview: Story = props =>
  html`<uui-loader
    style=${props.color ? 'color: ' + props.color : ''}></uui-loader>`;
Overview.args = { color: '' };
Overview.argTypes = {
  color: { table: { category: 'Styles' } },
};
