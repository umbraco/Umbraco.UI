import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-ref-node-form/lib/index';

export default {
  id: 'uui-ref-node-form',
  title: 'Displays/Refs/Form',
  component: 'uui-ref-node-form',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-form></uui-ref-node-form>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-ref-node-form></uui-ref-node-form>`;
