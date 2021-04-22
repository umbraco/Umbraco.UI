import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Menu List',
  component: 'uui-menu-list',
};

export const Basic = () => html`
  <uui-menu-list>
    <uui-menu-item selected>One 0</uui-menu-item>
    <uui-menu-item>Two 1</uui-menu-item>
    <uui-menu-item>Three 2</uui-menu-item>
  </uui-menu-list>
`;

export const nonInteractive = () => html`
  <uui-menu-list non-interactive>
    <uui-menu-item>One</uui-menu-item>
    <uui-menu-item>Two</uui-menu-item>
    <uui-menu-item>Three</uui-menu-item>
  </uui-menu-list>
  <div>You can still add selected attribute</div>
  <uui-menu-list non-interactive>
    <uui-menu-item>One</uui-menu-item>
    <uui-menu-item selected>Two</uui-menu-item>
    <uui-menu-item>Three</uui-menu-item>
  </uui-menu-list>
`;
