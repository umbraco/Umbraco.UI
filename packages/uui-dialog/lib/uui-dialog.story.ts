import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-dialog/lib/index';
import '@umbraco-ui/uui-button/lib/index';

export default {
  id: 'uui-dialog',
  title: 'Displays/Dialog',
  component: 'uui-dialog',
};

const Template: Story = () => html`
  <uui-dialog>
    <h4>Publish with descendants?</h4>
    <p>
      Publish <b>This example</b> and all content items underneath and thereby
      making their content publicly available.
    </p>
    <uui-button slot="actions">Cancel</uui-button>
    <uui-button slot="actions" look="positive">Publish</uui-button>
  </uui-dialog>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-dialog>
  <h4>Publish with descendants?</h4>
  <p>
    Publish <b>This example</b> and all content items underneath and thereby
    making their content publicly available.
  </p>
  <uui-button slot="actions">Cancel</uui-button>
  <uui-button slot="actions" look="positive">Publish</uui-button>
</uui-dialog>
    `,
    },
  },
};

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
  <uui-button slot="actions">Action</uui-button>
</uui-dialog>
    `,
    },
  },
};

export const LeftAlignedAction: Story = () => html`
  <uui-dialog>
    <h4>Publish with descendants?</h4>
    <p>
      Publish <b>This example</b> and all content items underneath and thereby
      making their content publicly available.
    </p>
    <uui-button
      slot="actions"
      look="secondary"
      style="margin-right: auto; margin-left: 0"
      >Cancel</uui-button
    >
    <uui-button slot="actions">Save</uui-button>
    <uui-button slot="actions" look="positive">Publish</uui-button>
  </uui-dialog>
`;

LeftAlignedAction.parameters = {
  docs: {
    source: {
      code: `
<uui-dialog>
  <h4>Publish with descendants?</h4>
  <p>
    Publish <b>This example</b> and all content items underneath and thereby
    making their content publicly available.
  </p>
  <uui-button
    slot="actions"
    look="secondary"
    style="margin-right: auto; margin-left: 0">
    Cancel
  </uui-button>
  <uui-button slot="actions">Save</uui-button>
  <uui-button slot="actions" look="positive">Publish</uui-button>
</uui-dialog>
    `,
    },
  },
};
