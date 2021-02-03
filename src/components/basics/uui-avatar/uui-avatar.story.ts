import { html } from 'lit-html';
import './index';
import { AvatarSizeNames, AvatarSizeType } from './uui-avatar.element';
import {
  SymbolicColorNames,
  SymbolicColorType,
} from '../../../type/SymbolicColor';

export default {
  title: 'Basics/Avatar',
  component: 'uui-avatar',
};

const avatarSrc =
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9';

const avatarSrcSet = [
  `${avatarSrc}&h=100&w=100`,
  `${avatarSrc}&h=200&w=200`,
  `${avatarSrc}&h=300&w=300`,
];

export const Basic = () => html`
  <uui-avatar
    size="m"
    img-src="${avatarSrcSet[0]}"
    img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
  >
  </uui-avatar>
`;

export const Sizes = () => html`
  <div style="display: flex; align-items: center;">
    ${AvatarSizeNames.map(
      (avatarSize: AvatarSizeType) =>
        html`
          <uui-avatar
            size="${avatarSize}"
            img-src="${avatarSrcSet[0]}"
            img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
          >
          </uui-avatar>
        `
    )}
  </div>
`;

export const Text = () => html`
  <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
`;

export const Looks = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar size="m" text="First Last"></uui-avatar>
    ${SymbolicColorNames.map(
      (symbolicColorName: SymbolicColorType) =>
        html`<uui-avatar
          look="${symbolicColorName}"
          size="m"
          text="First Last"
        ></uui-avatar>`
    )}
  </div>
`;

export const SlottedContent = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar size="m" look="primary">+10</uui-avatar>
  </div>
`;
