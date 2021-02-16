import { html } from 'lit-html';
import './index';
import '../../basics/uui-button/index';

export default {
  title: 'Fragments/Dialog',
  component: 'uui-dialog',
};

export const Default = () => html`
  <uui-dialog>
    <div>content slot</div>
    <div slot="actions">actions slot</div>
  </uui-dialog>
`;

export const WithContent = () => html`
  <uui-dialog>
    <div>
      <h3>Headline</h3>
      <p>Some description for this dialog</p>
    </div>
    <div slot="actions">
      <uui-button>Cancel</uui-button
      ><uui-button look="positive">Confirm</uui-button>
    </div>
  </uui-dialog>
`;
