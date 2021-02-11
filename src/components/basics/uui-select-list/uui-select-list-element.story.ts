import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Select List',
  component: 'uui-select-list',
};

export const Basic = () => html`
  <uui-select-list>
    <uui-select-list-item selected>One 0</uui-select-list-item>
    <uui-select-list-item>Two 1</uui-select-list-item>
    <uui-select-list-item>Three 2</uui-select-list-item>
  </uui-select-list>
`;

export const nonInteractive = () => html`
  <uui-select-list non-interactive>
    <uui-select-list-item>One</uui-select-list-item>
    <uui-select-list-item>Two</uui-select-list-item>
    <uui-select-list-item>Three</uui-select-list-item>
  </uui-select-list>
  <div>You can still add selected attribute</div>
  <uui-select-list non-interactive>
    <uui-select-list-item>One</uui-select-list-item>
    <uui-select-list-item selected>Two</uui-select-list-item>
    <uui-select-list-item>Three</uui-select-list-item>
  </uui-select-list>
`;
