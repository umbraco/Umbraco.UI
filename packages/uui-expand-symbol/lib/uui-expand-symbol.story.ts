import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-expand-symbol/lib/index';

export default {
  id: 'uui-expand-symbol',
  title: 'Symbols/Expand Symbol',
  component: 'uui-expand-symbol',
  parameters: {
    docs: {
      source: {
        code: `<uui-expand-symbol></uui-expand-symbol>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-expand-symbol open=${props.open}></uui-expand-symbol>`;
