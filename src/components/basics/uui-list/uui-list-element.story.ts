import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/List',
  component: 'uui-list',
};

export const Basic = () => html`
  <uui-list>
    <div>Test div</div>
    <uui-list-item selected>One</uui-list-item>
    <uui-list-item>Two</uui-list-item>
    <uui-list-item>Three</uui-list-item>
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
