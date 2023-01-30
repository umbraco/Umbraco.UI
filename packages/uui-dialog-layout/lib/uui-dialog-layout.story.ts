import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'uui-dialog-layout',
  title: 'Displays/Dialog/Dialog Layout',
  component: 'uui-dialog-layout',
  parameters: {
    docs: {
      source: {
        code: `<uui-dialog-layout></uui-dialog-layout>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`<uui-dialog-layout headline="Headline">
    <p>
      The dialog layout component provides a default layout to the dialog
      component. This is used as a direct child of the dialog element component.
      Please view Dialog stories for examples.
    </p>
    <uui-button slot="actions">Cancel</uui-button>
    <uui-button slot="actions" look="primary" color="positive"
      >Action</uui-button
    >
  </uui-dialog-layout>`;
