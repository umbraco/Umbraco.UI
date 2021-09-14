import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Avatar',
  component: 'uui-avatar',
};

const avatarSrc =
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9';

const avatarSrcSet = [
  `${avatarSrc}&h=100&w=100`,
  `${avatarSrc}&h=200&w=200`,
  `${avatarSrc}&h=300&w=300`,
];

const sizes = [0, 1, 2, 3, 4, 5];

export const Basic = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar
      img-src="${avatarSrcSet[0]}"
      img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
      title="First Last"
    >
    </uui-avatar>
  </div>
`;

export const Sizes = () => html`
  <div style="display: flex">
    ${sizes.map(
      size => html`<uui-avatar
        style="font-size: ${1 + size / 2}em;"
        title="First Last"
      ></uui-avatar>`
    )}
  </div>
`;

export const Text = () => html` <uui-avatar title="First Last"></uui-avatar> `;

export const Colors = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar
      title="First Last"
      style="
        background-color: var(--uui-color-space-cadet);
        color: var(--uui-color-spanish-pink);"
    ></uui-avatar>
  </div>
`;

export const SlottedContent = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar>A</uui-avatar>
  </div>
`;

export const WidthBadge = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar overflow title="First Last"
      ><uui-badge>!</uui-badge></uui-avatar
    >
    <uui-avatar
      overflow
      img-src="${avatarSrcSet[0]}"
      img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
      title="First Last"
      ><uui-badge>!</uui-badge></uui-avatar
    >
  </div>
`;
