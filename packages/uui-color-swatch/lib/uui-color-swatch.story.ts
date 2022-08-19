import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

const value = '#d0021b';

export default {
  id: 'uui-color-swatch',
  title: 'Color Swatch',
  component: 'uui-color-swatch',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch></uui-color-swatch>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-color-swatch .value=${value}></uui-color-swatch>`;
