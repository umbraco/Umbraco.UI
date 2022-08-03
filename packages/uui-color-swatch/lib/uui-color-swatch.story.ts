import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

const color = '#d0021b';

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
  html`<uui-color-swatch .color=${color}></uui-color-swatch>`;
