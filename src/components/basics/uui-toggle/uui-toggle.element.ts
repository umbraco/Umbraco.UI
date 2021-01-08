import {
  LitElement,
  html,
  property,
  css,
  query,
  internalProperty,
} from 'lit-element';
import { UUIToggleEvent } from '../../../event/UUIToggleEvent';

/**
 *  @element uui-toggle
 */

//TODO -color property -size property
//  #d8d7d9

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

type ToggleValue = 'on' | 'off';

export class UUIToggleElement extends LitElement {
  static styles = [
    css`
      :host {
        --size: 2rem;
        --switch-width: calc(2 * var(--size));
        font-family: Lato, Helvetica, Arial, 'sans-serif';
        font-size: 0.8rem;
        margin: 0.2em;
      }

      label {
        cursor: pointer;
        display: grid;
        grid-template-columns: max-content var(--switch-width) max-content;
        grid-template-rows: max-content var(--size) max-content;
        grid-template-areas:
          'top-left top top-right'
          'left center right'
          'bottom-left bottom bottom-right';
        grid-gap: calc(var(--size) / 4);
      }

      input {
        height: 0px;
        width: 0px;
        position: absolute;
      }

      #slider {
        place-self: stretch;
        transition: 0.2s ease;
        outline: var(--uui-color-spanish-pink) 0px solid;
        background: lightgrey;
        position: relative;
        grid-area: center;
      }

      :host([hide-label]) #label-text {
        height: 0;
        width: 0;
        opacity: 0;
      }

      :host([label-position='left']) #label-text {
        grid-area: left;
        place-self: center;
      }

      :host([label-position='right']) #label-text {
        grid-area: right;
        place-self: center;
      }

      :host([label-position='top']) #label-text {
        grid-area: top;
        place-self: center;
      }

      :host([label-position='bottom']) #label-text {
        grid-area: bottom;
        place-self: center;
      }

      :host([rounded]) #slider {
        border-radius: 100px;
      }

      :host([rounded]) #slider:after {
        border-radius: 100px;
      }

      #slider:after {
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

      #slider:before {
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

      input:checked + #slider {
        background: var(--uui-color-violet-blue);
      }

      input:checked + #slider:after {
        left: calc(100% - (0.1 * var(--size)));
        transform: translateX(-100%);
      }

      #slider:active:after {
        width: calc(1.2 * var(--size));
      }

      :host([disabled]) label {
        filter: brightness(1.15);
      }

      input[disabled] + #slider:active {
        animation: shake 0.6s ease backwards;
      }

      input[disabled] + #slider:active:after {
        width: calc(0.8 * var(--size));
      }

      input:focus ~ #slider,
      input:not([disabled]) ~ #slider:active {
        outline: var(--uui-color-spanish-pink) 2px solid;
        /* maybe change border to something else that can have a transformation applied with origin at the center */
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

  static formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  @internalProperty()
  _value: ToggleValue = 'off';

  @property({ type: String, reflect: true })
  get value(): ToggleValue {
    return this._value;
  }

  set value(newValue: ToggleValue) {
    this._value = newValue;
    this._internals.setFormValue(this._value);
  }

  @query('#switch')
  protected _input!: HTMLInputElement;

  @property({ type: String })
  label = 'Toggle';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: Boolean })
  rounded = true;

  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'left';

  @property({ type: Boolean, attribute: 'hide-label' })
  hideLabel = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  firstUpdated() {
    if (this.checked) {
      this._input.checked = true;
      this._value = 'on';
    }

    if (this.label && !this.name) {
      this.name = this.label;
    }
  }

  // updated() {
  //
  // }

  private _handleClick() {
    if (!this.disabled) this.checked = !this.checked;
  }

  private _handleInputChange() {
    if (this._input.checked) this._value = 'on';
    else this._value = 'off';
    this.dispatchEvent(
      new UUIToggleEvent('change', { detail: { value: this.value } })
    );
  }

  render() {
    return html`
      <label for="switch" @click="${this._handleClick}">
        <input
          type="checkbox"
          id="switch"
          ?disabled="${this.disabled}"
          @change="${this._handleInputChange}"
        />
        <div id="slider"></div>
        <div id="label-text">${this.label}</div>
      </label>
    `;
  }
}
