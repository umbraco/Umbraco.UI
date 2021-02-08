import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Badge',
  component: 'uui-badge',
};

export const Overview = () =>
  html`
    <uui-badge look="primary">Hello</uui-badge>
    <br />
    <uui-badge size="xs" look="danger">extra small danger</uui-badge>
    <uui-badge size="s" look="danger">small danger</uui-badge>
    <uui-badge size="m" look="danger">medium danger</uui-badge>
    <uui-badge size="l" look="danger">large danger</uui-badge>
    <uui-badge size="xl" look="danger">extra large danger</uui-badge>
    <br />
    <uui-badge size="xs" look="positive">extra small positive</uui-badge>
    <uui-badge size="s" look="positive">small positive</uui-badge>
    <uui-badge size="m" look="positive">medium positive</uui-badge>
    <uui-badge size="l" look="positive">large positive</uui-badge>
    <uui-badge size="xl" look="positive">extra large positive</uui-badge>
  `;
