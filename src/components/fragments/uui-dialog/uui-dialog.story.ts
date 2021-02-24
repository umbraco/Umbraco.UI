import { html } from 'lit-html';
import '.';
import '../../basics/uui-button';

export default {
  title: 'Fragments/Dialog',
  component: 'uui-dialog',
};

export const Default = () => html` <uui-dialog></uui-dialog> `;

export const Slots = () => html`
  <uui-dialog>
    <uui-button look="slot" style="width:100%; height: 96px;">
      Default slot
    </uui-button>
    <uui-button look="slot" style="width:50%;" slot="actions">
      Actions slot
    </uui-button>
  </uui-dialog>
`;

export const WithContent = () => html`
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
