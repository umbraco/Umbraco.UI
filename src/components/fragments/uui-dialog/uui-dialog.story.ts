import { html } from 'lit-html';
import './index';
import '../../basics/uui-button/index';

export default {
  title: 'Fragments/Dialog',
  component: 'uui-dialog',
};

export const Default = () => html` <uui-dialog> </uui-dialog> `;

export const Slots = () => html`
  <uui-dialog>
    <uui-button look="slot" style="width:100%; height: 96px;"
      >Default slot</uui-button
    >
    <uui-button look="slot" style="width:50%;" slot="actions"
      >Actions slot</uui-button
    >
  </uui-dialog>
`;

export const WithContent = () => html`
  <uui-dialog>
    <div>
      <h3>Headline</h3>
      <p>Some description for this dialog</p>
    </div>
    <div slot="actions">
      <uui-button>Cancel</uui-button>
      <uui-button look="positive">Confirm</uui-button>
    </div>
  </uui-dialog>
`;
