import { html, css, LitElement } from 'lit';
import { query, property } from 'lit/decorators';
import {
  UUIHorizontalShakeKeyframes,
  UUIHorizontalShakeAnimationValue,
} from '../../animations/uui-shake';
import { UUIRadioEvent } from './UUIRadioEvent';
/**
 *  @element uui-radio
 *  @slot - for label
 *
 */

export class UUIRadioElement extends LitElement {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: inherit;
        color: currentColor;
        --uui-radio-button-size: calc(var(--uui-size-base-unit) * 3);
        margin: var(--uui-size-base-unit) 0;
      }

      label {
        display: block;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 18px;
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
        background-color: var(--uui-interface-surface, white);
        border: 1px solid var(--uui-interface-border, #d8d7d9);
        border-radius: 100%;
        margin-right: calc(var(--uui-size-base-unit) * 2);
        position: relative;
      }

      #button::after {
        content: '';
        width: calc(var(--uui-radio-button-size) / 2);
        height: calc(var(--uui-radio-button-size) / 2);
        background-color: var(--uui-interface-chosen, #1b264f);
        border-radius: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.15s ease-in-out;
      }

      input:checked ~ #button::after {
        transform: translate(-50%, -50%) scale(1);
      }

      :host(:hover) #button {
        border: 1px solid var(--uui-interface-border-hover, #c4c4c4);
      }

      input:checked ~ #button {
        border: 1px solid var(--uui-interface-chosen, #1b264f);
      }

      input:checked:hover ~ #button {
        border: 1px solid var(--uui-interface-chosen-hover, #2152a3);
      }

      input:checked:hover ~ #button::after {
        background-color: var(--uui-interface-chosen-hover, #2152a3);
      }

      :host([disabled]) label {
        cursor: default;
      }
      :host([disabled]) .label {
        color: var(--uui-interface-contrast-disabled);
      }

      :host([disabled]) input ~ #button {
        border: 1px solid var(--uui-interface-border-disabled);
      }

      :host([disabled]) input:checked ~ #button {
        border: 1px solid var(--uui-interface-chosen-disabled);
      }

      :host([disabled]) input:checked ~ #button::after {
        background-color: var(--uui-interface-chosen-disabled);
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

  @query('#input')
  private inputElement!: HTMLInputElement;

  @property({ type: String })
  public name = '';

  @property({ type: String })
  public value = '';

  @property({ type: String })
  public label = '';

  @property({ type: Boolean, reflect: true })
  public checked = false;

  private _disabled = false;
  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this._disabled;
  }

  set disabled(newVal) {
    const oldVal = this._disabled;
    this._disabled = newVal;
    if (newVal) {
      this.setAttribute('aria-hidden', 'true');
      this.setAttribute('tabindex', '-1');
    }
    this.requestUpdate('disabled', oldVal);
  }

  private _onChange() {
    if (this.inputElement.checked) this.check();
    else this.uncheck();
  }

  public uncheck() {
    this.checked = false;
    this.setAttribute('tabindex', '-1');
    this.setAttribute('aria-checked', 'false');
  }

  public check() {
    this.checked = true;
    this.dispatchEvent(new UUIRadioEvent(UUIRadioEvent.CHANGE));
    if (!this.disabled) {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-checked', 'true');
      this.focus();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    //if (!this.hasAttribute('role')) this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');
    if (!this.hasAttribute('aria-checked'))
      this.setAttribute('aria-checked', 'false');
  }

  render() {
    return html` <label>
      <input
        id="input"
        type="radio"
        role="radio"
        name=${this.name}
        value=${this.value}
        .checked=${this.checked}
        .disabled=${this.disabled}
        @change=${this._onChange}
      />
      <div id="button"></div>
      <div id="label">
        ${this.label ? html`<span>${this.label}</span>` : html`<slot></slot>`}
      </div>
    </label>`;
  }
}
