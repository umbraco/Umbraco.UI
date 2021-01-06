import { LitElement, html, property, css } from 'lit-element';

/**
 *  @element uui-toggle
 */

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

export class UUIToggleElement extends LitElement {
  static styles = [
    css`
      :host {
        --size: 30px;
        font-family: Lato, Helvetica, Arial, 'sans-serif';
        font-size: 0.8rem;
        display: flex;
        flex-basis: 0;
        align-items: center;
        margin: 0.2em;
      }

      input {
        height: 0;
        width: 0;
        visibility: hidden;
      }

      label {
        cursor: pointer;

        width: calc(2 * var(--size));
        height: var(--size);

        background: lightgrey;
        display: block;

        position: relative;
      }

      :host([rounded]) label {
        border-radius: 100px;
      }

      :host([rounded]) label:after {
        border-radius: 100px;
      }

      label:after {
        content: '';
        position: absolute;

        top: calc(0.1 * var(--size));
        left: calc(0.1 * var(--size));
        width: calc(0.8 * var(--size));
        height: calc(0.8 * var(--size));

        background: #fff;
        /* border-radius: 90px; */
        transition: 0.2s ease;
      }

      label:before {
        content: 'X';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: calc(0.3 * var(--size));
        font-size: 0.7rem;
        font-weight: bold;
        color: lightgrey;
        filter: brightness(0.5);
      }

      input:checked + label {
        background: lightblue;
      }

      input:checked + label:after {
        left: calc(100% - (0.1 * var(--size)));
        transform: translateX(-100%);
      }

      label:active:after {
        width: calc(1.2 * var(--size));
      }

      input[disabled] + label:active:after {
        width: calc(0.8 * var(--size));
      }

      :host([label-position='left']) {
        flex-direction: row-reverse;
        justify-content: flex-end;
      }

      :host([label-position='right']) {
        flex-direction: row;
        justify-content: flex-start;
      }

      :host([label-position='top']) {
        flex-direction: column-reverse;
        justify-content: flex-start;
        align-items: flex-start;
      }

      :host([label-position='bottom']) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      .toggle-label {
        margin: 0.7em;
      }
    `,
  ];

  @property({ type: Boolean })
  rounded = true;

  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'left';

  @property({ type: String, reflect: true })
  label = 'Label';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _handleClick() {
    if (!this.disabled) this.checked = !this.checked;
    console.log('clicked');
  }

  render() {
    return html`
      <input type="checkbox" id="switch" ?disabled="${this.disabled}" />
      <label for="switch" @click="${this._handleClick}"></label>
      <span class="toggle-label">${this.label}</span> ${this.checked}
    `;
  }
}
