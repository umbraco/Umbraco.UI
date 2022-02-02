import '.';
import '@umbraco-ui/uui-button/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-dialog',
  title: 'Displays/Dialog',
  component: 'uui-dialog',
};

const Template: Story = () => html`
  <uui-dialog>
    <h4>Short headline</h4>
    <p>
      Make a short description and <b>highlight</b> the affected data.<br /><br />
      Keep actions concrete, if asking a question in headline make sure to have
      actions that answers it.
    </p>
    <uui-button slot="actions">Cancel</uui-button>
    <uui-button slot="actions" look="positive">Action</uui-button>
  </uui-dialog>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Test = () => html`
  <uui-dialog>
    <uui-dialog-layout>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quae
        iusto porro impedit quasi odit, nihil facere pariatur vero! Quaerat sint
        tempore ullam corporis nihil dolorum cum consequuntur ad provident.
      </div>
      <uui-button slot="actions">Cancel</uui-button>
      <uui-button slot="actions" look="positive">Save</uui-button>
    </uui-dialog-layout>
  </uui-dialog>
`;

export const Slots: Story = () => html`
  <uui-dialog>
    <uui-button disabled look="placeholder" style="width:100%; height: 96px;">
      Default slot
    </uui-button>
    <uui-button disabled look="placeholder" style="width:50%;" slot="actions">
      Actions slot
    </uui-button>
  </uui-dialog>
`;

Slots.parameters = {
  docs: {
    source: {
      code: `
<uui-dialog>
  <div>Default slot</div>
  <div slot="actions">Action</div>
</uui-dialog>
    `,
    },
  },
};

export const ConfirmDialogPositive: Story = () => html`
  <uui-dialog>
    <h4>Publish with descendants</h4>
    <p>
      Publish <b>This example</b> and all content items underneath and thereby
      making their content publicly available.
    </p>
    <uui-button slot="actions">Cancel</uui-button>
    <uui-button slot="actions" look="positive">Publish</uui-button>
  </uui-dialog>
`;

export const ConfirmDialogDanger: Story = () => html`
  <uui-dialog>
    <h4>Delete</h4>
    <p>Delete <b>This example</b> and all items underneath.</p>
    <uui-button slot="actions">Cancel</uui-button>
    <uui-button slot="actions" look="danger">Delete</uui-button>
  </uui-dialog>
`;
