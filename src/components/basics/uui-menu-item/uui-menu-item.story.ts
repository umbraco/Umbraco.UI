import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Menu Item',
  component: 'uui-menu-item',
};

export const Basic = () =>
  html`<uui-menu-item>This is list item</uui-menu-item>
    <uui-menu-item active>This is active list item</uui-menu-item>`;
