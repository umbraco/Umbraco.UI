import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import './modal-example.element';

export default {
  id: 'uui-modal',
  title: 'Layout/Modals',
  component: 'uui-modal',
  parameters: {
    docs: {
      source: {
        code: `<uui-modal></uui-modal>`,
      },
    },
  },
};

export const Overview: Story = () => {
  return html`<modal-example></modal-example>`;
};
