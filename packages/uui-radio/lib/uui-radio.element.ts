import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

import { UUIRadioEvent } from './UUIRadioEvent';

/**
 *  @element uui-radio
 *  @description - a single radio, should never be use as a stand-alone. Must be wrapped in `<uui-radio-group></uui-radio-group>` element.
 *  @slot - slot to set the label if no `label` attribute is set.
 *  @cssprop --uui-radio-button-size - Sets the size of the radio button.
 *  @fires change - on input change
 */
@defineElement('uui-radio')
export class UUIRadioElement extends LitElement {
  @query('#input')
  private inputElement!: HTMLInputElement;

  /**
   * This is a name property of the `<uui-radio>` component. It reflects the behaviour of the native `<input />` element and its name attribute.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  public name = '';

  /**
   * This is a value property of the `<uui-radio>`.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  public value = '';

  @property({ type: String })
  public label = '';

  @property({ type: Boolean, reflect: true })
  public get checked() {
    return this._checked;
  }
  public set checked(value) {
    const oldValue = this._checked;
    this._checked = value;
    if (value === true) {
      this.setAttribute('aria-checked', '');
      if (!this.disabled) {
        this.setAttribute('tabindex', '0');
      }
    } else {
      this.setAttribute('tabindex', '-1');
      this.removeAttribute('aria-checked');
    }
    this.requestUpdate('checked', oldValue);
  }
  private _checked = false;

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this._disabled;
  }
  set disabled(newVal) {
    const oldVal = this._disabled;
    this._disabled = newVal;

    this.setAttribute('aria-hidden', newVal ? 'true' : 'false');
    this.setAttribute('tabindex', newVal ? '-1' : '0');
    this.requestUpdate('disabled', oldVal);
  }
  private _disabled = false;

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  constructor() {
    super();
    this.addEventListener('mousedown', this.#hideFocusOutline);
    this.addEventListener('blur', this.#showFocusOutline);
  }

  focus() {
    this.inputElement.focus();
  }
  click() {
    this.inputElement.click();
  }

  #showFocusOutline = () => {
    this.style.setProperty('--uui-show-focus-outline', '1');
  };

  #hideFocusOutline = () => {
    this.style.setProperty('--uui-show-focus-outline', '0');
  };

  private _onChange(e: Event) {
    e.stopPropagation();
    const checked = this.inputElement.checked;
    this.checked = checked;
    if (checked) {
      this.focus();
    }
    this.dispatchEvent(new UUIRadioEvent(UUIRadioEvent.CHANGE));
  }

  /**
   * Call to uncheck the element. This method changes the tabindex and aria -checked attributes.
   * @method uncheck
   */
  public uncheck() {
    this.checked = false;
  }

  /**
   * Call to check the element.
   * @method uncheck
   */
  public check() {
    this.checked = true;
  }
  /**
   * Call to make the element focusable, this sets tabindex to 0.
   * @method makeFocusable
   */
  public makeFocusable() {
    if (!this.disabled) {
      this.setAttribute('tabindex', '0');
    }
  }
  /**
   * Call to make the element focusable, this sets tabindex to 0.
   * @method makeUnfocusable
   */
  public makeUnfocusable() {
    if (!this.disabled) {
      this.setAttribute('tabindex', '-1');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    //if (!this.hasAttribute('role')) this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');
    if (!this.hasAttribute('aria-checked'))
      this.removeAttribute('aria-checked');
  }

  render() {
    return html` <label>
      <input
        id="input"
        type="radio"
        name=${this.name}
        value=${this.value}
        .checked=${this.checked}
        .disabled=${this.disabled || this.readonly}
        @change=${this._onChange} />
      <div id="button"></div>
      <div id="label">
        ${this.label ? html`<span>${this.label}</span>` : html`<slot></slot>`}
      </div>
    </label>`;
  }

  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: inherit;
        color: currentColor;
        --uui-radio-button-size: var(--uui-size-6);
        margin: var(--uui-size-2) 0;
      }

      label {
        position: relative;
        box-sizing: border-box;
        user-select: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 18px;
      }

      :host([readonly]) label {
        cursor: default;
      }

      #input {
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
      }

      .label {
        margin-top: 2px;
      }

      #button {
        box-sizing: border-box;
        display: inline-block;
        width: var(--uui-radio-button-size, 18px);
        height: var(--uui-radio-button-size, 18px);
        background-color: var(--uui-color-surface);
        border: 1px solid var(--uui-color-border-standalone);
        border-radius: 100%;
        margin-right: calc(var(--uui-size-2) * 2);
        position: relative;
        flex: 0 0 var(--uui-radio-button-size);
      }

      #button::after {
        content: '';
        width: calc(var(--uui-radio-button-size) / 2);
        height: calc(var(--uui-radio-button-size) / 2);
        background-color: var(--uui-color-selected);
        border-radius: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.15s ease-in-out;
      }

      :host(:hover) #button {
        border: 1px solid var(--uui-color-border-emphasis);
      }

      :host(:focus) {
        outline: none;
      }
      :host(:focus) #button {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }

      input:checked ~ #button::after {
        transform: translate(-50%, -50%) scale(1);
      }

      input:checked ~ #button {
        border: 1px solid var(--uui-color-selected);
      }

      input:checked:hover ~ #button {
        border: 1px solid var(--uui-color-selected-emphasis);
      }

      input:checked:hover ~ #button::after {
        background-color: var(--uui-color-selected-emphasis);
      }

      :host([disabled]) label {
        cursor: not-allowed;
        opacity: 0.5;
      }
      :host([disabled]) .label {
        color: var(--uui-color-disabled-contrast);
      }

      :host([disabled]) input ~ #button {
        border: 1px solid var(--uui-color-disabled-contrast);
      }

      :host([disabled]) input:checked ~ #button {
        border: 1px solid var(--uui-color-disabled-contrast);
      }

      :host([disabled]) input:checked ~ #button::after {
        background-color: var(--uui-color-disabled-contrast);
      }

      :host([disabled]:active) #button {
        animation: ${UUIHorizontalShakeAnimationValue};
      }

      @media (prefers-reduced-motion) {
        :host([disabled]:active) #button {
          animation: none;
        }

        #button::after {
          transition: none;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-radio': UUIRadioElement;
  }
}
