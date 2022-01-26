import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-color-swatches/lib/index';

export default {
  id: 'uui-color-swatches',
  title: 'Color Swatches',
  component: 'uui-color-swatches',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatches></uui-color-swatches>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-color-swatches></uui-color-swatches>`;
