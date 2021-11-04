import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-select/lib/index';

export default {
  id: 'uui-select',
  title: 'Inputs/Select',
  component: 'uui-select',
  parameters: {
    docs: {
      source: {
        code: `<uui-select></uui-select>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-select
    ><option>HEllo</option>
    <option>Goodbye</option>
    <option>See you</option>
    /uui-select></uui-select
  >`;
