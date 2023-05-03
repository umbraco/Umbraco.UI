import '.';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'uui-dialog',
  title: 'Displays/Dialog/Dialog',
  component: 'uui-dialog',
};

const Template: Story = () => html`
  <uui-dialog>
    <uui-dialog-layout headline="Short headline">
      <p>
        Make a short description and <b>highlight</b> the affected data.<br /><br />
        Keep actions concrete, if asking a question in headline make sure to
        have actions that answers it.
      </p>
      <uui-button slot="actions">Cancel</uui-button>
      <uui-button slot="actions" look="primary" color="positive"
        >Action</uui-button
      >
    </uui-dialog-layout>
  </uui-dialog>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const ConfirmDialogPositive: Story = () => html`
  <uui-dialog>
    <uui-dialog-layout headline="Publish with descendants">
      <p>
        Publish <b>This example</b> and all content items underneath and thereby
        making their content publicly available.
      </p>
      <uui-button slot="actions">Cancel</uui-button>
      <uui-button slot="actions" look="primary" color="positive"
        >Publish</uui-button
      >
    </uui-dialog-layout>
  </uui-dialog>
`;

export const ConfirmDialogDanger: Story = () => html`
  <uui-dialog>
    <uui-dialog-layout headline="Delete">
      <p>Delete <b>This example</b> and all items underneath.</p>
      <uui-button slot="actions">Cancel</uui-button>
      <uui-button slot="actions" look="primary" color="danger"
        >Delete</uui-button
      >
    </uui-dialog-layout>
  </uui-dialog>
`;

export const HeadlineSlot: Story = () => html`
  <uui-icon-registry-essential>
    <uui-dialog>
      <uui-dialog-layout>
        <span slot="headline">
          <uui-icon name="code"></uui-icon> With Icon
        </span>
        <p>This is using a <b>slot</b> for the headline.</p>
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="danger"
          >Delete</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>
  </uui-icon-registry-essential>
`;
