import { html } from 'lit-html';
import { UUIModalElement } from '../uui-modal/uui-modal.element';
import { UUIConfirmDialogElement } from '../uui-confirm-dialog/uui-confirm-dialog.element';
import './index';

export default {
  title: 'Compositions/Modal Container',
  component: 'uui-modal-container',
};

function addModal() {
  const con = document.querySelector('uui-modal-container');
  const modal = new UUIModalElement();
  modal.style.left = Math.floor(Math.random() * 70).toString() + '%';
  modal.style.top = Math.floor(Math.random() * 50).toString() + '%';

  const demoDialog = new UUIConfirmDialogElement();
  demoDialog.setAttribute('look', 'danger');
  demoDialog.setAttribute('title', 'Are you sure about this?');
  demoDialog.innerHTML =
    'This action needs confirmation, please make sure to consider this action.';
  modal.appendChild(demoDialog);

  if (con) {
    con.appendChild(modal);
  }
}
function removeModal() {
  const con = document.querySelector('uui-modal-container');
  if (con) {
    const last = con.querySelector('uui-modal:last-of-type') as UUIModalElement;
    if (last) {
      con.removeChild(last);
    }
  }
}
function closeModal() {
  const con = document.querySelector('uui-modal-container');
  if (con) {
    const last = con.querySelector('uui-modal:last-of-type') as UUIModalElement;
    if (last) {
      last.closeModal();
    }
  }
}

export const Default = () => html`
  <uui-modal-container
    style="position:relative; display: block; width: 100%; height: 50vh;">
  </uui-modal-container>
  <button @click=${addModal}>Open</button>
  <button @click=${removeModal}>Remove one</button>
  <button @click=${closeModal}>Close one</button>
`;
