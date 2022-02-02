import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-form',
  title: 'Form',
  component: 'uui-form',
  parameters: {
    docs: {
      source: {
        code: `<uui-form></uui-form>`,
      },
    },
  },
};

export const Overview: Story = () => html`<uui-form></uui-form>`;
