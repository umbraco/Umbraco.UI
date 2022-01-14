import { html } from 'lit-html';
import './index';

export default {
  title: 'Compositions/Modal',
  component: 'uui-modal',
};

export const Default = () => html` <uui-modal></uui-modal> `;

export const WithDialog = () =>
  html`
    <uui-modal style="width:100%; height: 50vh;"
      ><uui-confirm-dialog look="danger" title="Are you sure about this?"
        >This action needs confirmation, please make sure to consider this
        action.</uui-confirm-dialog
      ></uui-modal
    >
  `;
