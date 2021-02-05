import { LitElement, html, property, css } from 'lit-element';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
  InterfaceLookCSSCreator,
} from '../../../type/InterfaceLook';

/**
 *  @element uui-avatar
 */

export type AvatarSizeType = '' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const AvatarSizeNames: Readonly<AvatarSizeType[]> = [
  'xxl',
  'xl',
  'l',
  'm',
  's',
  'xs',
  'xxs',
] as const;

export const AvatarSizeDefaultValue = '';
export class UUIAvatarElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        font-weight: bold;
        width: 2.17em;
        height: 2.17em;
      }

      :host([size='xxs']) {
        font-size: 12px;
      }

      :host([size='xs']) {
        font-size: 14px;
      }

      :host([size='s']) {
        font-size: 18px;
      }

      :host([size='m']) {
        font-size: 23px;
      }

      :host([size='l']) {
        font-size: 32px;
      }

      :host([size='xl']) {
        font-size: 46px;
      }

      :host([size='xxl']) {
        font-size: 70px;
      }

      .image {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    `,
    InterfaceLookCSSCreator(
      symbolicColorName =>
        css`
          :host([look='${symbolicColorName}']) {
            background-color: var(--uui-color-${symbolicColorName}-background);
            color: var(--uui-color-${symbolicColorName}-contrast);
          }
        `
    ),
  ];

  @property({ type: String, attribute: true })
  public size: AvatarSizeType = AvatarSizeDefaultValue;

  @property({ type: String, attribute: 'img-src' })
  public imgSrc = '';

  @property({ type: String, attribute: 'img-srcset' })
  public imgSrcset = '';

  @property({ type: String, attribute: true })
  public look: InterfaceLookType = InterfaceLookDefaultValue;

  @property({ type: String, attribute: true })
  public text = '';

  @property({ type: String })
  unknownCharacter = '?';

  get initials(): string {
    let initials = '';
    const words = this.text.split(' ');
    initials = words[0].substring(0, 1);

    if (words.length > 1) {
      initials += words[words.length - 1].substring(0, 1);
    }

    return initials;
  }

  render() {
    return html`
      ${this.imgSrc
        ? html`<img
            src="${this.imgSrc}"
            srcset="${this.imgSrcset}"
            alt="${this.text}"
            class="image"
          />`
        : html``}
      ${!this.imgSrc && this.text
        ? html`${this.initials || this.unknownCharacter}`
        : ``}
      <slot></slot>
    `;
  }
}
