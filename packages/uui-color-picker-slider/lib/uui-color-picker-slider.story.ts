import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-color-picker-slider',
  title: 'Color Picker Slider',
  component: 'uui-color-picker-slider',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-picker-slider></uui-color-picker-slider>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-color-picker-slider></uui-color-picker-slider>`;
