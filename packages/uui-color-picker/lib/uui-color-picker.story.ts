import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-color-picker/lib/index';

export default {
  id: 'uui-color-picker',
  title: 'Color Picker',
  component: 'uui-color-picker',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-picker></uui-color-picker>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-color-picker
    value=${props.min}></uui-color-picker>
`;
