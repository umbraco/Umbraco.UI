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
        box-sizing: border-box;
      }

      input {
        height: 0px;
        width: 0px;
        /* visibility: hidden;   what is best practice here? */
      }

      label {
        cursor: pointer;

        width: calc(2 * var(--size));
        height: var(--size);
        border: var(--uui-color-spanish-pink) 0px outset;
        background: lightgrey;
        display: block;
        position: relative;
        transition: 0.2s ease;
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

        background: var(--uui-color-white);
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
        background: var(--uui-color-violet-blue);
      }

      input:checked + label:after {
        left: calc(100% - (0.1 * var(--size)));
        transform: translateX(-100%);
      }

      label:active:after {
        width: calc(1.2 * var(--size));
      }

      :host([disabled]) {
        filter: brightness(1.1);
      }

      input[disabled] + label:active {
        animation: shake 0.6s ease backwards;
      }

      input[disabled] + label:active:after {
        width: calc(0.8 * var(--size));
      }

      input:focus ~ label,
      input:not([disabled]) ~ label:active {
        border: var(--uui-color-spanish-pink) 2px outset;
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

      @keyframes shake {
        10%,
        90% {
          transform: translateX(-1px);
        }

        20%,
        80% {
          transform: translateX(2px);
        }

        30%,
        50%,
        70% {
          transform: translateX(-3px);
        }

        40%,
        60% {
          transform: translateX(3px);
        }
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
      <span class="toggle-label">${this.label}</span>
    `;
  }
}
