import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-color-slider',
  title: 'Color Slider',
  component: 'uui-color-slider',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-slider></uui-color-slider>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-color-slider></uui-color-slider>`;
