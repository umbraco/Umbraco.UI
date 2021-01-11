import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/List',
  component: 'uui-list',
};

export const Basic = () => html`
  <uui-list>
    <uui-list-item>One</uui-list-item>
    <uui-list-item>Two</uui-list-item>
    <uui-list-item>Three</uui-list-item>
  </uui-list>
`;
