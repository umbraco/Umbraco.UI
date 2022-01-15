import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toast-notification/lib/index';

export default {
  id: 'uui-toast-notification',
  title: 'Displays/Toast Notification',
  component: 'uui-toast-notification',
  args: {
    headline: 'Headline',
  },
};

export const AAAOverview: Story = props =>
  html`<uui-toast-notification>
    <h5>${props.headline}</h5>
    Hello world, this is a great message with a bit too much text but its
    showing a great example of what this can do.
  </uui-toast-notification>`;

AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  label: 'Document has been published!',
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-toast-notification headline="My headline"></uui-toast-notification>`,
    },
  },
};
