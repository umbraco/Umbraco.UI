import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-select-custom',
  title: 'Select Custom',
  component: 'uui-select-custom',
  parameters: {
    docs: {
      source: {
        code: `<uui-select-custom></uui-select-custom>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-select-custom @change=${(e: any) => console.log('CHANGE', e)}>
    <uui-select-option display-value="Banana" value="bannana"
      ><b>bananana</b></uui-select-option
    >
    <uui-select-option value="apple">i am apple</uui-select-option>
    <uui-select-option value="orange">i am orange, the fruit</uui-select-option>
    <uui-select-option value="pineapple">i am pineapple</uui-select-option>
    <uui-select-option value="kiwi">i am kiwi</uui-select-option>
  </uui-select-custom>`;
