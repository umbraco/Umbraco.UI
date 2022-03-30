import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-toast-notification-layout',
  title: 'Displays/Toast Notification/Toast Notification Layout',
  component: 'uui-toast-notification-layout',
  argTypes: {
    slot: {
      control: { type: 'text' },
    },
  },
  parameters: {
    controls: {
      exclude: ['styles'],
    },
  },
  decorators: [
    (Story: any) => html`<div style="max-width:200px;">${Story()}</div>`,
  ],
};

export const Overview: Story = props =>
  html`<uui-toast-notification-layout .headline=${props.headline}>
    Use this component within your dialog-element.
    <uui-button slot="actions" look="primary" label="button"></uui-button>
  </uui-toast-notification-layout>`;

Overview.args = {
  headline: 'Headline',
};

export const SlottedContent: Story = props =>
  html`<uui-toast-notification-layout>
    <h3 slot="headline">${props['headline slot']}</h3>
    ${props.slot}
    <div slot="actions">
      <uui-icon-registry-essential>
        <uui-action-bar>
          <uui-button look="primary"
            ><uui-icon name="add"></uui-icon
          ></uui-button>
          <uui-button look="outline"
            ><uui-icon name="delete"></uui-icon
          ></uui-button>
        </uui-action-bar>
      </uui-icon-registry-essential>
    </div>
  </uui-toast-notification-layout>`;

SlottedContent.args = {
  'headline slot': 'Headline',
  slot: 'This is the default slot',
};

SlottedContent.argTypes = {
  'headline slot': { control: { type: 'text' } },
};

SlottedContent.parameters = {
  controls: {
    include: ['headline slot', 'slot'],
  },
};
