import { html } from 'lit-html';
import './index';

export default {
  title: 'Misc/Tag',
  component: 'uui-tag',
};

export const Basic = () => html` <uui-tag>Hello</uui-tag> `;

export const Overview = () =>
  html`
    <uui-tag>Hello</uui-tag>
    <br />
    <uui-tag size="xs" look="primary">extra small danger</uui-tag>
    <uui-tag size="s" look="primary">small danger</uui-tag>
    <uui-tag size="m" look="primary">medium danger</uui-tag>
    <uui-tag size="l" look="primary">large danger</uui-tag>
    <uui-tag size="xl" look="primary">extra large danger</uui-tag>
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

export const WithButton = () =>
  html`
    <uui-tag look="primary" size="xl">
      <span>Hello</span>
      <uui-button
        label="delete this"
        look="primary"
        compact
        style="margin-right:-10px; --uui-button-height:2em;"
      >
        <uui-icon
          svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M401.431 167.814l-58.757-58.76-88.029 88.026-88.028-88.026-58.76 58.76 88.026 88.027-88.026 88.024 58.76 58.768 88.028-88.031 88.029 88.031 58.757-58.768-88.027-88.024z"/></svg>'
        ></uui-icon>
      </uui-button>
    </uui-tag>
  `;
