import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Badge',
  component: 'uui-badge',
};

export const Overview = () =>
  html`
    <uui-badge>Hello</uui-badge>
    <uui-badge size="s" color="danger">small danger</uui-badge>
    <uui-badge size="xl" color="positive">extra large positive</uui-badge>
  `;
