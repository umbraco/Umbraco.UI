import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Toggle',
  component: 'uui-toggle',
};

export const Basic = () => html`
  <uui-toggle rounded></uui-toggle>
  <uui-toggle rounded label-position="right"></uui-toggle>
  <uui-toggle rounded label-position="top"></uui-toggle>
  <uui-toggle rounded label-position="bottom"></uui-toggle>
  <uui-toggle></uui-toggle>
`;
