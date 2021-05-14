import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Tag',
  component: 'uui-tag',
};

export const Overview = () =>
  html`
    <uui-tag>Hello</uui-tag>
    <br />
    <uui-tag size="xs" look="danger">extra small danger</uui-tag>
    <uui-tag size="s" look="danger">small danger</uui-tag>
    <uui-tag size="m" look="danger">medium danger</uui-tag>
    <uui-tag size="l" look="danger">large danger</uui-tag>
    <uui-tag size="xl" look="danger">extra large danger</uui-tag>
    <br />
    <uui-tag size="xs" look="positive">extra small positive</uui-tag>
    <uui-tag size="s" look="positive">small positive</uui-tag>
    <uui-tag size="m" look="positive">medium positive</uui-tag>
    <uui-tag size="l" look="positive">large positive</uui-tag>
    <uui-tag size="xl" look="positive">extra large positive</uui-tag>
  `;
