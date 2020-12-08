import { html } from 'lit-html';
import './index';

export default {
  title: 'Basic/Button',
  component: 'uui-button',
};

export const Default = () => html` <uui-button>Basic button</uui-button> `;

export const WithStyle = () => html`
  <uui-button button-style="positive" loading>Positive button</uui-button>
`;
