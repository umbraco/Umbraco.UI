import { property, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

/**
 *  @element uui-avatar
 *  @description Anatar for displaying users
 *  @slot for anything other then initials (no more than 2-3 characters)
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

  @property({ type: Boolean, attribute: true, reflect: true })
  public overflow = false;

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
