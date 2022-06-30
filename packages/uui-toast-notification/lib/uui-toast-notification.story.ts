import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-toast-notification',
  title: 'Displays/Toast Notification/Toast Notification',
  component: 'uui-toast-notification',
  args: {
    open: true,
    headline: 'Toast notification layout headline',
    slot: 'Message to be displayed, shown by toast notification layout.',
  },
  argTypes: {
    color: {
      options: ['', 'default', 'positive', 'warning', 'danger'],
      control: { type: 'select' },
    },
    slot: {
      control: { type: 'text' },
    },
  },
};

const Template: Story = props => html`<uui-toast-notification
  .open=${props.open}
  .color=${props.color}>
  <uui-toast-notification-layout .headline=${props.headline}>
    ${props.slot}
  </uui-toast-notification-layout>
</uui-toast-notification>`;

export const AAAOverview: Story = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      type: 'dynamic',
    },
  },
};

export const ErrorStyle: Story = props => html`<uui-toast-notification
  .open=${props.open}
  .color=${props.color}>
  <uui-toast-notification-layout .headline=${props.headline}>
    ${props.slot}
    <uui-button slot="actions" look="primary" color="danger">Retry</uui-button>
  </uui-toast-notification-layout>
</uui-toast-notification>`;
ErrorStyle.args = {
  headline: 'Document could not be published!',
  slot: 'An error occurred while attempting to contact the server. Please check your internet connection.',
  color: 'danger',
};
ErrorStyle.parameters = {
  docs: {
    source: {
      code: `
<uui-toast-notification color="danger">
  <uui-toast-notification-layout headline="Your title">
    Your description
    <uui-button slot="actions" color="danger">Retry</uui-button>
  </uui-toast-notification-layout>
</uui-toast-notification>`,
    },
  },
};

export const PositiveStyle: Story = props => html`<uui-toast-notification
  .open=${props.open}
  .color=${props.color}>
  <uui-toast-notification-layout .headline=${props.headline}>
    ${props.slot}
    <uui-button slot="actions" look="primary" .color=${props.color}
      >View in browser</uui-button
    >
  </uui-toast-notification-layout>
</uui-toast-notification>`;
PositiveStyle.args = {
  headline: 'Document was published',
  slot: 'This document is now saved and published.',
  color: 'positive',
};
PositiveStyle.parameters = {
  docs: {
    source: {
      code: `
<uui-toast-notification color="positive">
  <uui-toast-notification-layout headline="Your title">
    Your description
  </uui-toast-notification-layout>
</uui-toast-notification>`,
    },
  },
};

export const CustomLayout: Story = props => html`<uui-toast-notification
  .open=${props.open}
  color="danger">
  ${props.slot
    ? props.slot
    : html` Its recommended to use the 'uui-toast-notification-layout' component
      as the layout for your toasts. This will ensure consistency in toast
      appearances, help achieving the best user experience. If
      'uui-toast-notification-layout' does not provide the options to solve your
      needs, it is possible append anything within the toast-notification
      component. But please consider this very carefully.`}
</uui-toast-notification>`;
CustomLayout.args = {
  headline: '',
  color: 'danger',
  slot: undefined,
};
CustomLayout.parameters = {
  docs: {
    source: {
      code: `
<uui-toast-notification>
  <!-- Anything can be injected here -->
</uui-toast-notification>`,
    },
  },
};
