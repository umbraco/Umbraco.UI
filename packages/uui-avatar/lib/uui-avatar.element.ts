import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 *  Avatar for displaying users
 *  @element uui-avatar
 *  @slot - For anything other than initials (no more than 2-3 characters)
 */
@defineElement('uui-avatar')
export class UUIAvatarElement extends LitElement {
  /**
   * Set to true to prevent content from getting hidden if going outside the parent. Useful in combination with something like a Badge.
   * @type {boolean}
   * @attr overflow
   * @default true
   */
  @property({ type: Boolean, attribute: true, reflect: true })
  public overflow = true;

  /**
   * Use this to apply a image src
   * @type {string}
   * @attr img-src
   * @default ''
   */
  @property({ type: String, attribute: 'img-src' })
  public imgSrc = '';

  /**
   * Use this to apply a image srcset
   * @type {string}
   * @attr img-srcset
   * @default ''
   */
  @property({ type: String, attribute: 'img-srcset' })
  public imgSrcset = '';

  /**
   * Provide the name used for labels and to generate the initials.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String, reflect: true })
  get name() {
    return this._name;
  }
  set name(newVal) {
    const oldValue = this._name;
    this._name = newVal;
    this.initials = this.createInitials(this._name);
    this.requestUpdate('title', oldValue);
  }
  private _name = '';

  @state()
  private initials = '';

  connectedCallback() {
    super.connectedCallback();
    if (!this.name) {
      console.warn(this.tagName + ' needs a `name`', this);
    }
  }

  private createInitials(name: string) {
    let initials = '';

    if (!name) {
      return initials;
    }

    const matches = [...name.matchAll(/(?:^|\s)(.)/g)];
    const words = matches.map(m => m[1]).join('');
    if (!words?.length) {
      return initials;
    }

    initials = words[0].substring(0, 1);

    if (words.length > 1) {
      initials += words[words.length - 1].substring(0, 1);
    }

    return initials.toUpperCase();
  }

  private renderImage() {
    return html` <img
      src="${this.imgSrc}"
      srcset="${this.imgSrcset}"
      alt="${this.initials}"
      title="${this.name}" />`;
  }

  render() {
    return html`
      ${this.imgSrc ? this.renderImage() : ''}
      ${!this.imgSrc ? this.initials : ''}
      <slot></slot>
    `;
  }

  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        font-weight: 700;
        -webkit-font-smoothing: subpixel-antialiased;
        width: calc(2em + 4px);
        height: calc(2em + 4px);
        user-select: none;
        /* box-sizing: border-box; */
        aspect-ratio: 1;
        background-color: var(--uui-palette-spanish-pink);
        color: var(--uui-palette-space-cadet);
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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-avatar': UUIAvatarElement;
  }
}
