import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  id: 'uui-ref-node',
  title: 'Displays/Refs/Node',
  component: 'uui-ref-node',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node></uui-ref-node>`,
      },
    },
  },
};

export const Overview: Story = () => html`<uui-ref-node></uui-ref-node>`;
