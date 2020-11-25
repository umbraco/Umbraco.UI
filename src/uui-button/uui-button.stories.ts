import { html } from 'lit-html';
import './index';

export default {
  title: 'Uui Button',
  component: 'uui-button',
};

export const Basic = () => html` <uui-button>Basic button</uui-button> `;

export const Advanced = () =>
  html`
    <uui-button button-style="success" loading>Success-button</uui-button>
  `;
