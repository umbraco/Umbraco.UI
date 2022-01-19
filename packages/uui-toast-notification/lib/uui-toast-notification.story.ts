import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toast-notification/lib/index';

export default {
  id: 'uui-toast-notification',
  title: 'Displays/Toast Notification',
  component: 'uui-toast-notification',
  args: {
    open: true,
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
  .headline=${props.headline}
  .look=${props.look}>
  This page is now available.
  <uui-button slot="actions">Open website</uui-button>
</uui-toast-notification>`;

export const AAAOverview: Story = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  headline: 'Document has been published!',
};

export const ErrorStyle: Story = props => html`<uui-toast-notification
  .open=${props.open}
  .headline=${props.headline}
  look="danger">
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

export const Progress: Story = props => html`<uui-toast-notification
  .headline=${props.headline}
  look="danger">
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
