import { property, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

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

/**
 *  @element uui-avatar
 *  @description Anatar for displaying users
 *  @slot for anything other then initials
 */

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
        width: 2em;
        height: 2em;
        user-select: none;

        background-color: var(--uui-color-spanish-pink);
        color: var(--uui-color-space-cadet);
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

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  public size: AvatarSizeType = AvatarSizeDefaultValue;

  @property({ type: String, attribute: 'img-src' })
  public imgSrc = '';

  @property({ type: String, attribute: 'img-srcset' })
  public imgSrcset = '';

  private _title = '';
  @property({ type: String })
  get title() {
    return this._title;
  }
  set title(newVal) {
    const oldValue = this._title;
    this._title = newVal;

    let initials = '';
    const words = this._title.split(' ');
    initials = words[0].substring(0, 1);
    if (words.length > 1) {
      initials += words[words.length - 1].substring(0, 1);
    }
    this.initials = initials.toUpperCase();

    this.requestUpdate('title', oldValue);
  }

  @state()
  private initials = '';

  render() {
    return html`
      ${this.imgSrc
        ? html`<img
            src="${this.imgSrc}"
            srcset="${this.imgSrcset}"
            alt="${this.initials}"
            title="${this.title}"
          />`
        : ''}
      ${!this.imgSrc ? this.initials : ''}
      <slot></slot>
    `;
  }
}
