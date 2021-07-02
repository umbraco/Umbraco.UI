import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Lock Slot',
  component: 'uui-lock-slot',
};

export const Overview = () =>
  html`
    <uui-lock-slot>
      <uui-textfield>Hello world</uui-textfield>
    </uui-lock-slot>
  `;
