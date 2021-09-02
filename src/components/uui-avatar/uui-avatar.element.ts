import { property, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

/**
 *  @element uui-avatar
 *  @description Anatar for displaying users
 *  @slot For anything other than initials (no more than 2-3 characters)
 */

export class UUIAvatarElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        font-weight: bold;
        width: 2em;
        height: 2em;
        user-select: none;
        /* box-sizing: border-box; */

        background-color: var(--uui-color-spanish-pink);
        color: var(--uui-color-space-cadet);
      }

      :host([overflow]) {
        overflow: unset;
      }

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        overflow: hidden;
        border-radius: 50%;
      }
    `,
  ];

  /**
   * Set to true to prevent content from getting hidden if going outside the parent. Useful in combination with something like a Badge.
   * @type {boolean}
   * @attr overflow
   * @default [false]
   */
  @property({ type: Boolean, attribute: true, reflect: true })
  public overflow = false;

  /**
   * Use this to apply a image src
   * @type {String}
   * @attr img-src
   * @default ['']
   */
  @property({ type: String, attribute: 'img-src' })
  public imgSrc = '';

  /**
   * Use this to apply a image srcset
   * @type {String}
   * @attr img-srcset
   * @default ['']
   */
  @property({ type: String, attribute: 'img-srcset' })
  public imgSrcset = '';

  /**
   * This controls the initials displayed when no scr or scrset is set.
   * @type {String}
   * @attr
   * @default ['']
   */
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
  private _title = '';

  @state()
  private initials = '';

  renderImage() {
    return html` <img
      src="${this.imgSrc}"
      srcset="${this.imgSrcset}"
      alt="${this.initials}"
      title="${this.title}"
    />`;
  }

  render() {
    return html`
      ${this.imgSrc ? this.renderImage() : ''}
      ${!this.imgSrc ? this.initials : ''}
      <slot> </slot>
    `;
  }
}
