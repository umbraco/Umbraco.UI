import { LitElement, html, property, css } from 'lit-element';

/**
 *  @element uui-avatar
 */

// TODO Global sizes type?
type AvatarSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

// TODO Global color type?
type AvatarColor =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'warning'
  | 'danger'
  | 'white'
  | 'gray';

export class UUIAvatarElement extends LitElement {
  // TODO Maybe look into making the default avatar size fully responsive?
  // TODO Update color themes when color variables are ready
  static styles = [
    css`
      :host {
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-sizing: border-box;

        color: #000000;
        background-color: transparent;

        width: 100%;
        height: 100%;
        font-size: 16px;
      }

      :host([size='xxs']) {
        width: 26px;
        height: 26px;
        font-size: 12px;
      }

      :host([size='xs']) {
        width: 30px;
        height: 30px;
        font-size: 12px;
      }

      :host([size='s']) {
        width: 40px;
        height: 40px;
        font-size: 14px;
      }

      :host([size='m']) {
        width: 50px;
        height: 50px;
        font-size: 16px;
      }

      :host([size='l']) {
        width: 70px;
        height: 70px;
        font-size: 18px;
      }

      :host([size='l']) {
        width: 70px;
        height: 70px;
        font-size: 18px;
      }

      :host([size='xl']) {
        width: 100px;
        height: 100px;
        font-size: 20px;
      }

      :host([size='xxl']) {
        width: 150px;
        height: 150px;
        font-size: 36px;
      }

      :host([color='primary']) {
        background-color: pink;
        color: black;
      }

      :host([color='secondary']) {
        background-color: blue;
        color: white;
      }

      :host([color='success']) {
        background: green;
        color: white;
      }

      :host([color='warning']) {
        background: yellow;
        color: black;
      }

      :host([color='danger']) {
        background: red;
        color: white;
      }

      :host([color='white']) {
        background: white;
        color: black;
      }

      :host([color='gray']) {
        background: whitesmoke;
        color: black;
      }

      .image {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }

      text {
        width: 100%;
      }
    `,
  ];

  @property({ type: String, attribute: true })
  public size: AvatarSize = 'm';

  @property({ type: String, attribute: 'img-src' })
  public imgSrc = '';

  @property({ type: String, attribute: 'img-srcset' })
  public imgSrcset = '';

  @property({ type: String, attribute: true })
  public color: AvatarColor = 'primary';

  @property({ type: String, attribute: true })
  public name = '';

  @property({ type: String })
  unknownCharacter = '?';

  get initials() {
    let initials = '';
    const names = this.name.split(' ');
    initials = names[0].substring(0, 1);

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1);
    }

    return initials;
  }

  render() {
    return html`
      ${this.imgSrc
        ? html`<img
            src="${this.imgSrc}"
            srcset="${this.imgSrcset}"
            alt="${this.name}"
            class="image"
          />`
        : html`<span>${this.initials || this.unknownCharacter}</span>`}
    `;
  }
}
