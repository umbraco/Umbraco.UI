import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { FormControlMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import {
  iconCheck,
  iconWrong,
} from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

export type UUIButtonState = null | 'waiting' | 'success' | 'failed';

export type UUIButtonType = 'submit' | 'button' | 'reset';

export type Look =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'placeholder';
export type Color = 'primary' | 'positive' | 'warning' | 'danger';

/**
 *  @element uui-button
 *  @fires {UUIButtonEvent} click - fires when the element is clicked
 *  @slot extra - for extra
 *  @description - All-round button
 *  @cssprop --uui-button-height - overwrite the button height
 *  @cssprop --uui-button-border-width - overwrite the border width
 *  @cssprop --uui-button-border-radius - overwrite the border radius
 *  @cssprop --uui-button-font-weight - overwrite the font weight
 *  @cssprop --uui-button-font-size - overwrite the font size
 *  @cssprop --uui-button-background-color - overwrite the background color
 *  @cssprop --uui-button-background-color-hover - overwrite the background color for hover state
 *  @cssprop --uui-button-background-color-disabled - overwrite the background color for disabled state
 *  @cssprop --uui-button-border-color - overwrite the border color
 *  @cssprop --uui-button-border-color-hover - overwrite the border color for hover state
 *  @cssprop --uui-button-border-color-disabled - overwrite the border color for disabled state
 *  @cssprop --uui-button-contrast - overwrite the text color
 *  @cssprop --uui-button-contrast-hover - overwrite the text color for hover state
 *  @cssprop --uui-button-contrast-disabled - overwrite the text color for disabled state
 */
@defineElement('uui-button')
export class UUIButtonElement extends FormControlMixin(
  LabelMixin('', LitElement)
) {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        position: relative;
        display: inline-block;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-padding-left-factor: 3;
        --uui-button-padding-right-factor: 3;
        --uui-button-padding-top-factor: 1;
        --uui-button-padding-bottom-factor: 1;

        height: var(--uui-button-height, auto);
        max-height: 100%;
        cursor: pointer;

        text-align: center;
        font-size: var(--uui-button-font-size, inherit);
        font-weight: var(--uui-button-font-weight, 700);
        transition: background-color 80ms, border-color 80ms, color 80ms;

        border-width: var(--uui-button-border-width, 1px);
        border-style: solid;
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-border-radius)
        );
        cursor: pointer;
      }

      :host([compact]) {
        --uui-button-padding-left-factor: 1;
        --uui-button-padding-right-factor: 1;
      }

      .label {
        display: block;
        transition: opacity 120ms;
      }
      :host([state]:not([state=''])) .label {
        opacity: 0;
      }

      #state {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        opacity: 0;
        animation-name: fadeIn;
        animation-delay: 40ms;
        animation-duration: 360ms;
        animation-fill-mode: forwards;
      }

      button {
        height: 100%;
        width: 100%;
        background-color: transparent;
        color: inherit;
        border-radius: inherit;
        font-family: inherit;
        font-weight: inherit;
        text-align: inherit;
        border: none;
        cursor: inherit;

        padding: calc(calc(8 / 15 * 1em) * var(--uui-button-padding-top-factor))
          calc(var(--uui-size-2) * var(--uui-button-padding-right-factor))
          calc(calc(8 / 15 * 1em) * var(--uui-button-padding-bottom-factor))
          calc(var(--uui-size-2) * var(--uui-button-padding-left-factor));
        vertical-align: middle;
        box-shadow: none;
      }
      button[disabled]:active {
        animation: ${UUIHorizontalShakeAnimationValue};
      }
      #icon-check,
      #icon-wrong {
        fill: currentColor;
        display: grid;
        place-items: center;
        width: 1.5em;
      }

      #loader {
        font-size: 1.5em;
      }
      :host([look]:not([look=''])) #loader {
        color: inherit;
      }

      /* ANIMATIONS */
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      :host {
        --uui-button-color: var(--uui-color-primary);
        --uui-button-color-standalone: var(--uui-color-primary-standalone);
        --uui-button-color-emphasis: var(--uui-color-primary-emphasis);
        --uui-button-color-contrast: var(--uui-color-primary-contrast);
      }
      :host([color='positive']) {
        --uui-button-color: var(--uui-color-positive);
        --uui-button-color-standalone: var(--uui-color-positive-standalone);
        --uui-button-color-emphasis: var(--uui-color-positive-emphasis);
        --uui-button-color-contrast: var(--uui-color-positive-contrast);
      }
      :host([color='warning']) {
        --uui-button-color: var(--uui-color-warning);
        --uui-button-color-standalone: var(--uui-color-warning-standalone);
        --uui-button-color-emphasis: var(--uui-color-warning-emphasis);
        --uui-button-color-contrast: var(--uui-color-warning-contrast);
      }
      :host([color='danger']) {
        --uui-button-color: var(--uui-color-danger);
        --uui-button-color-standalone: var(--uui-color-danger-standalone);
        --uui-button-color-emphasis: var(--uui-color-danger-emphasis);
        --uui-button-color-contrast: var(--uui-color-danger-contrast);
      }
      :host([disabled]) {
        --uui-button-color: var(--uui-color-disabled);
        --uui-button-color-standalone: var(--uui-color-disabled-contrast);
        --uui-button-color-emphasis: var(--uui-color-disabled);
        --uui-button-color-contrast: var(--uui-color-disabled-contrast);

        cursor: default;
      }

      :host {
        border-color: transparent;
        background-color: transparent;
        color: var(--uui-button-color-standalone);
      }
      :host(:not([disabled]):hover) {
        background-color: var(--uui-color-hover);
      }
      :host([look='primary']) {
        background-color: var(--uui-button-color);
        color: var(--uui-button-color-contrast);
        border-color: transparent;
      }
      :host([look='primary']:hover) {
        background-color: var(--uui-button-color-emphasis);
      }
      :host([look='secondary']) {
        background-color: var(--uui-color-surface-alt);
        color: var(--uui-button-color-standalone);
        border-color: transparent;
      }
      :host([look='secondary']:hover) {
        background-color: var(--uui-color-hover);
      }
      :host([look='secondary'][disabled]) {
        background-color: var(--uui-button-color);
      }
      :host([look='outline']) {
        background-color: transparent;
        color: var(--uui-button-color-standalone);
        border-color: var(--uui-button-color-standalone);
      }
      :host([look='outline']:not([disabled]):hover) {
        background-color: var(--uui-button-color);
        color: var(--uui-button-color-contrast);
        border-color: transparent;
      }
      :host([look='outline'][disabled]) {
        border-color: var(--uui-button-color);
      }
      :host([look='placeholder']) {
        background-color: transparent;
        color: var(--uui-button-color-standalone);
        border-color: var(--uui-button-color-standalone);
        border-style: dashed;
      }
    `,
  ];
  /**
   * Specifies the type of button.
   * @type { "submit" | "button" | "reset" }
   * @attr
   * @default "button"
   */
  @property({ type: String, reflect: true })
  type: UUIButtonType = 'button';

  /**
   * Disables the button, changes the looks of it and prevents if from emitting the click event
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {""default" | "primary" | "secondary" | "outline" | "placeholder""}
   * @attr
   * @default "default"
   */
  @property({ reflect: true })
  look: Look = 'default';

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {""primary" | "positive" | "warning" | "danger""}
   * @attr
   * @default "primary"
   */
  @property({ reflect: true })
  color: Color = 'primary';

  /**
   * Makes the left and right padding of the button narrower.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Sets the state of the button. With waiting state a loader will show, the success state and fail states display icons. State is reset do default automatically after 3 seconds.
   * @type {null |'waiting' | 'success' | 'failed'}
   * @attr
   * @default null
   */
  @property({ type: String, reflect: true })
  state: UUIButtonState = null;

  @query('#button')
  protected _button!: HTMLInputElement;

  constructor() {
    super();
    this.addEventListener('click', this._onHostClick);
  }

  protected getFormElement(): HTMLElement {
    return this._button;
  }

  private _onHostClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    if (this._internals?.form) {
      switch (this.type) {
        case 'reset':
          this._internals.form.reset();
          break;
        case 'button':
          break;
        default:
          if (this._internals.form.requestSubmit) {
            this._internals.form.requestSubmit();
          } else {
            this._internals.form.dispatchEvent(new SubmitEvent('submit'));
          }
          break;
      }
    }
  }

  private _resetStateTimeout?: number;

  // Reset the state after 2sec if it is 'success' or 'failed'.
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('state')) {
      clearTimeout(this._resetStateTimeout);
      if (this.state === 'success' || this.state === 'failed') {
        this._resetStateTimeout = setTimeout(
          () => (this.state = null),
          2000
        ) as any;
      }
    }
  }

  protected renderState() {
    let element = html``;
    switch (this.state) {
      case 'waiting':
        demandCustomElement(this, 'uui-loader-circle');
        element = html`<uui-loader-circle id="loader"></uui-loader-circle>`;
        break;
      case 'success':
        demandCustomElement(this, 'uui-icon');
        element = html`<uui-icon
          name="check"
          .fallback=${iconCheck.strings[0]}></uui-icon>`;
        break;
      case 'failed':
        demandCustomElement(this, 'uui-icon');
        element = html`<uui-icon
          name="wrong"
          .fallback=${iconWrong.strings[0]}></uui-icon>`;
        break;
      default:
        return '';
    }

    return html`<div id="state">${element}</div>`;
  }

  render() {
    return html`
      <button id="button" ?disabled=${this.disabled} aria-label="${this.label}">
        ${this.renderState()} ${this.renderLabel()}
        <slot name="extra"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-button': UUIButtonElement;
  }
}
