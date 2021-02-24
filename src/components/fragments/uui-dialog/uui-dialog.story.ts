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
    <h3>Headline</h3>
    <p>Some description for this dialog</p>
    <uui-button slot="actions">Cancel</uui-button>
    <uui-button slot="actions" look="positive">Confirm</uui-button>
  </uui-dialog>
`;
