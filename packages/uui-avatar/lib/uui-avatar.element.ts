import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

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
  name = '';

  /**
   * Use this to override the initials generated from the name.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  initials?: string;

  private get _initials() {
    return this.initials?.substring(0, 3) || this.createInitials(this.name);
  }

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

    // Split by whitespace and filter out parts that don't start with valid characters
    // This regex matches: letters (any script), numbers, emojis, and other non-punctuation characters
    // It excludes special characters like parentheses, brackets, @ symbols, etc.
    const nameParts = name
      .split(/\s+/)
      .filter(
        part => part.length > 0 && !/^[^\p{L}\p{N}\p{Emoji}]/u.test(part),
      );

    if (nameParts.length === 0) {
      return initials;
    }

    // Take first character of the first valid name part
    initials = nameParts[0].charAt(0);

    // If there's more than one valid name part, add the first character of the last valid name part
    if (nameParts.length > 1) {
      initials += nameParts[nameParts.length - 1].charAt(0);
    }

    return initials.toUpperCase();
  }

  private renderImage() {
    return html` <img
      src="${this.imgSrc}"
      srcset="${this.imgSrcset}"
      alt="${this._initials}"
      title="${this.name}" />`;
  }

  render() {
    return html`
      ${this.imgSrc ? this.renderImage() : ''}
      ${!this.imgSrc ? this._initials : ''}
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
