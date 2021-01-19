import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Button',
  component: 'uui-button',
};

export const Default = () => html` <uui-button>Basic button</uui-button> `;

export const Disabled = () =>
  html` <uui-button disabled>Disabled button</uui-button> `;

export const WithStyle = () => html`
  <uui-button button-style="positive" loading>Positive button</uui-button>
`;
