import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toast-notification/lib/index';

export default {
  id: 'uui-toast-notification',
  title: 'Displays/Toast Notification/Toast Notification',
  component: 'uui-toast-notification',
  args: {
    open: true,
    look: '',
    headline: 'Toast notification layout headline',
    message: 'Message to be displayed, shown by toast notification layout.',
  },
  argTypes: {
    look: {
      options: ['', 'primary', 'positive', 'warning', 'danger'],
      control: { type: 'select' },
    },
  },
};

const Template: Story = props => html`<uui-toast-notification
  .open=${props.open}
  .look=${props.look}>
  <uui-toast-notification-layout .headline=${props.headline}>
    ${props.message}
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
  .look=${props.look}>
  <uui-toast-notification-layout headline="Document could not be published!">
    An error occurred while attempting to contact the server. Please check your
    internet connection.
    <uui-button slot="actions" look="danger">Retry</uui-button>
  </uui-toast-notification-layout>
</uui-toast-notification>`;
ErrorStyle.args = {
  headline: 'Document could not be published!',
  look: 'danger',
};
ErrorStyle.parameters = {
  docs: {
    source: {
      code: `
      <uui-toast-notification look="danger">
        <uui-toast-notification-layout headline="Your title">
          Your description
          <uui-button slot="actions" look="danger">Retry</uui-button>
        </uui-toast-notification-layout>
      </uui-toast-notification>`,
    },
  },
};

export const PositiveStyle: Story = props => html`<uui-toast-notification
  .open=${props.open}
  .look=${props.look}>
  <uui-toast-notification-layout .headline=${props.headline}>
    <p>This document is now saved and published.</p>
    <uui-button slot="actions" .look=${props.look}>View in browser</uui-button>
  </uui-toast-notification-layout>
</uui-toast-notification>`;
PositiveStyle.args = {
  headline: 'Document was published',
  look: 'positive',
};
PositiveStyle.parameters = {
  docs: {
    source: {
      code: `
      <uui-toast-notification look="positive">
        <uui-toast-notification-layout headline="Your title">
          Your description
        </uui-toast-notification-layout>
      </uui-toast-notification>`,
    },
  },
};

export const CustomLayout: Story = props => html`<uui-toast-notification
  .open=${props.open}
  look="danger">
  Its recommended to use the 'uui-toast-notification-layout' component as the
  layout for your toasts. This will ensure consistency in toast appearances,
  help achieving the best user experience. If 'uui-toast-notification-layout'
  does not provide the options to solve your needs, it is possible append
  anything within the toast-notification component. But please consider this
  very carefully.
</uui-toast-notification>`;
CustomLayout.args = {
  headline: '',
  look: 'danger',
};
CustomLayout.parameters = {
  docs: {
    source: {
      code: `<uui-toast-notification><!-- Anything can be injected here --></uui-toast-notification>`,
    },
  },
};
