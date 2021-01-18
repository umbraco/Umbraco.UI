import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/List',
  component: 'uui-list',
};

export const Basic = () => html`
  <uui-list>
    <uui-list-item selected>One 0</uui-list-item>
    <uui-list-item>Two 1</uui-list-item>
    <uui-list-item>Three 2</uui-list-item>
  </uui-list>
`;

export const nonInteractive = () => html`
  <uui-list non-interactive>
    <uui-list-item>One</uui-list-item>
    <uui-list-item>Two</uui-list-item>
    <uui-list-item>Three</uui-list-item>
  </uui-list>
  <div>You can still add selected attribute</div>
  <uui-list non-interactive>
    <uui-list-item>One</uui-list-item>
    <uui-list-item selected>Two</uui-list-item>
    <uui-list-item>Three</uui-list-item>
  </uui-list>
`;
