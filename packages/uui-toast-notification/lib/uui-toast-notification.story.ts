import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toast-notification/lib/index';

export default {
  id: 'uui-toast-notification',
  title: 'Displays/Toast Notification',
  component: 'uui-toast-notification',
  argTypes: {
    look: {
      options: ['', 'primary', 'positive', 'warning', 'danger'],
      control: { type: 'select' },
    },
  },
};
const Template: Story = props => html`<uui-toast-notification
  .headline=${props.headline}
  .look=${props.look}>
  This version is now available.
</uui-toast-notification>`;

export const AAAOverview: Story = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  headline: 'Document has been published!',
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-toast-notification headline="My headline"></uui-toast-notification>`,
    },
  },
};

export const ErrorStyle: Story = props => html`<uui-toast-notification
  .headline=${props.headline}
  .look=${props.look}>
  An error occurred while attempting to contact the server. Please check your
  internet connection.
  <uui-button slot="actions" look="danger">Retry</uui-button>
</uui-toast-notification>`;
ErrorStyle.args = {
  headline: 'Document could not be published!',
  look: 'danger',
};
ErrorStyle.parameters = {
  docs: {
    source: {
      code: `<uui-toast-notification look="danger" headline="Error title">Description</uui-toast-notification>`,
    },
  },
};
