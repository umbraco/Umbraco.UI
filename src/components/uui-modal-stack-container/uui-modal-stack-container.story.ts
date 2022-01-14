import { html } from 'lit-html';
import { UUIModalElement } from '../uui-modal/uui-modal.element';
import './index';

export default {
  title: 'Compositions/Modal Stack Container',
  component: 'uui-modal-stack-container',
};

//let count = 0;

function addModal() {
  const con = document.querySelector('uui-modal-stack-container');
  const modal = new UUIModalElement();
  //modal.style.backgroundColor = ['red', 'green', 'yellow', 'blue', 'grey', 'purple'][count++ % 6];
  if (con) {
    con.appendChild(modal);
  }
}
function removeModal() {
  const con = document.querySelector('uui-modal-stack-container');
  if (con) {
    const last = con.querySelector('uui-modal:last-of-type') as UUIModalElement;
    if (last) {
      con.removeChild(last);
    }
  }
}
function closeModal() {
  const con = document.querySelector('uui-modal-stack-container');
  if (con) {
    const last = con.querySelector('uui-modal:last-of-type') as UUIModalElement;
    if (last) {
      last.closeModal();
    }
  }
}

export const Default = () => html`
  <style>
    uui-modal {
      border: 1px solid grey;
      box-sizing: border-box;
      background-color: white;
    }
  </style>
  <uui-modal-stack-container
    style="position:relative; display: block; width: calc(100% + 48px); height: 50vh; margin-left:-24px; margin-right:-24px; overflow:hidden;">
  </uui-modal-stack-container>
  <button @click=${addModal}>Open</button>
  <button @click=${removeModal}>Remove one</button>
  <button @click=${closeModal}>Close one</button>
`;
