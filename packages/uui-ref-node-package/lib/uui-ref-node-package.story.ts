import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  id: 'uui-ref-node-package',
  title: 'Displays/Refs/Package',
  component: 'uui-ref-node-package',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-package></uui-ref-node-package>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-ref-node-package></uui-ref-node-package>`;
