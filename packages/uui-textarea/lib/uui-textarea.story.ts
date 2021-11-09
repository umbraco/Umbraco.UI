import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-textarea/lib/index';

export default {
  id: 'uui-textarea',
  title: 'Inputs/Textarea',
  component: 'uui-textarea',
  parameters: {
    docs: {
      source: {
        code: `<uui-textarea></uui-textarea>`,
      },
    },
  },
};

export const Overview: Story = props => html`<uui-textarea></uui-textarea>`;
