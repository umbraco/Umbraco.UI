import { html } from 'lit-html';
import { UUIModalElement } from '../uui-modal/uui-modal.element';
import './index';

export default {
  title: 'Compositions/Modal Container',
  component: 'uui-modal-container',
};

function addModal() {
  const con = document.querySelector('uui-modal-container');
  const modal = new UUIModalElement();
  //const demoEl = document.createElement('div');
  modal.style.width = '200px';
  modal.style.height = '200px';
  modal.style.backgroundColor = 'red';
  //modal.appendChild(demoEl);
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
    style="position:relative; display: block; width: 400px; height: 400px;"
  >
  </uui-modal-container>
  <button @click=${addModal}>Open</button>
  <button @click=${removeModal}>Remove one</button>
  <button @click=${closeModal}>Close one</button>
`;
