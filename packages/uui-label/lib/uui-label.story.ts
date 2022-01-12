import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-label/lib/index';
import '@umbraco-ui/uui-input/lib/index';
import '@umbraco-ui/uui-checkbox/lib/index';

export default {
  id: 'uui-label',
  title: 'Inputs/Label',
  component: 'uui-label',
  parameters: {
    docs: {
      source: {
        code: `<uui-label></uui-label>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`
    <uui-label for="MyInput">My Label</uui-label>
    <uui-input id="MyInput" label="My A11Y Label">My Input value</uui-input>
  `;
export const ForCheckbox: Story = () =>
  html`
    <uui-label for="MyInput">My Label</uui-label>
    <uui-checkbox id="MyInput" label="My A11Y Label"></uui-checkbox>
  `;
export const UseWithNativeInput: Story = () =>
  html`
  <uui-label for="MyInput">My Label</uui-label>
  <input id="MyInput" type="text" aria-label="My A11Y Label"></input>
`;
