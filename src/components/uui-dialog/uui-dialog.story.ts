import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-button/lib/index';
import './index';

export default {
  title: 'Compositions/Dialog',
  component: 'uui-dialog',
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

export const WithContent: Story = () => html`
  <uui-dialog>
    <h4>Publish with descendants?</h4>
    <p>
      Publish <b>This example</b> and all content items underneath and thereby
      making their content publicly available.
    </p>
    <uui-button d slot="actions">Cancel</uui-button>
    <uui-button slot="actions" look="positive">Publish</uui-button>
  </uui-dialog>
`;

export const LeftAligned: Story = () => html`
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
