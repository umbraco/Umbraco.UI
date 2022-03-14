import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-select-list',
  title: 'Select List',
  component: 'uui-select-list',
  parameters: {
    docs: {
      source: {
        code: `<uui-select-list></uui-select-list>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-select-list
    multiple
    @change=${(e: any) =>
      console.log('Received event with data: ', e.detail.selected)}>
    <div>Option 1</div>
    <div>Option 2</div>
    <div>Option 3</div>
    <div>Option 4</div>
    <div>Option 5</div>
  </uui-select-list>`;
