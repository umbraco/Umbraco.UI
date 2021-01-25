import { html } from 'lit-html';
import './index';

export default {
  title: 'Fragments/Dialog',
  component: 'uui-dialog',
};

export const Basic = () => html` <uui-dialog>
  <uui-button slot="actions">Cancel</uui-button>
  <uui-button slot="actions" button-style="positive">Do this</uui-button>
</uui-dialog>`;
