import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import {
  InterfaceLookDefaultValue,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import {
  iconCheck,
  iconWrong,
} from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export type UUIButtonState = null | 'waiting' | 'success' | 'failed';

export type UUIButtonType = 'submit' | 'button' | 'reset';

/**
 *  @element uui-button
 *  @fires {UUIButtonEvent} click - fires when the element is clicked
 *  @slot - for button contents
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
export class UUIButtonElement extends LabelMixin('', LitElement) {
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
        min-height: var(--uui-button-height, auto);
        width: 100%;

        padding: calc(calc(8 / 15 * 1em) * var(--uui-button-padding-top-factor))
          calc(var(--uui-size-2) * var(--uui-button-padding-right-factor))
          calc(calc(8 / 15 * 1em) * var(--uui-button-padding-bottom-factor))
          calc(var(--uui-size-2) * var(--uui-button-padding-left-factor));
        text-align: center;
        vertical-align: middle;
        box-shadow: none;
        border-width: var(--uui-button-border-width, 1px);
        border-style: solid;
        border-color: var(
          --uui-button-border-color,
          var(--uui-interface-surface)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-border-radius)
        );
        cursor: pointer;
        font-weight: var(
          --uui-button-font-weight,
          var(--uui-interface-font-weight)
        );
        font-size: var(--uui-button-font-size, inherit);
        font-family: inherit;

        background-color: var(
          --uui-button-background-color,
          var(--uui-interface-surface)
        );
        color: var(--uui-button-contrast, var(--uui-interface-contrast));

        transition: background-color 80ms, border-color 80ms, color 80ms;
      }
      button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-interface-surface-hover)
        );
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-interface-surface-hover)
        );
        color: var(
          --uui-button-contrast-hover,
          var(--uui-interface-contrast-hover)
        );
      }

      button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        color: var(
          --uui-button-contrast-disabled,
          var(--uui-interface-contrast-disabled)
        );
        cursor: default;
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

      /* LOOKS */

      :host([look='primary']) button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-look-primary-surface)
        );
        color: var(--uui-look-primary-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-primary-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-primary-border-radius, var(--uui-border-radius))
        );
        border-color: var(
          --uui-button-border-color,
          var(--uui-look-primary-border)
        );
        font-weight: var(--uui-look-primary-font-weight);
      }
      :host([look='primary']) button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-look-primary-surface-hover)
        );
        color: var(--uui-look-primary-contrast-hover);
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-look-primary-border-hover)
        );
      }
      :host([look='primary']) button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-look-primary-surface-disabled)
        );
        color: var(--uui-look-primary-contrast-disabled);
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-look-primary-border-disabled)
        );
      }

      :host([look='secondary']) button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-look-secondary-surface)
        );
        color: var(--uui-look-secondary-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-secondary-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-secondary-border-radius, var(--uui-border-radius))
        );
        border-color: var(
          --uui-button-border-color,
          var(--uui-look-secondary-border)
        );
        font-weight: var(--uui-look-secondary-font-weight);
      }
      :host([look='secondary']) button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-look-secondary-surface-hover)
        );
        color: var(--uui-look-secondary-contrast-hover);
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-look-secondary-border-hover)
        );
      }
      :host([look='secondary']) button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-look-secondary-surface-disabled)
        );
        color: var(--uui-look-secondary-contrast-disabled);
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-look-secondary-border-disabled)
        );
      }

      :host([look='outline']) button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-look-outline-surface)
        );
        color: var(--uui-look-outline-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-outline-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-outline-border-radius, var(--uui-border-radius))
        );
        border-color: var(
          --uui-button-border-color,
          var(--uui-look-outline-border)
        );
        font-weight: var(--uui-look-outline-font-weight);
      }
      :host([look='outline']) button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-look-outline-surface-hover)
        );
        color: var(--uui-look-outline-contrast-hover);
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-look-outline-border-hover)
        );
      }
      :host([look='outline']) button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-look-outline-surface-disabled)
        );
        color: var(--uui-look-outline-contrast-disabled);
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-look-outline-border-disabled)
        );
      }

      :host([look='placeholder']) button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-look-placeholder-surface)
        );
        color: var(--uui-look-placeholder-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-placeholder-border-style, dashed)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-placeholder-border-radius, var(--uui-border-radius))
        );
        border-color: var(
          --uui-button-border-color,
          var(--uui-look-placeholder-border)
        );
        font-weight: var(--uui-look-placeholder-font-weight);
      }
      :host([look='placeholder']) button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-look-placeholder-surface-hover)
        );
        color: var(--uui-look-placeholder-contrast-hover);
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-look-placeholder-border-hover)
        );
      }
      :host([look='placeholder']) button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-look-placeholder-surface-disabled)
        );
        color: var(--uui-look-placeholder-contrast-disabled);
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-look-placeholder-border-disabled)
        );
      }

      :host([look='positive']) button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-look-positive-surface)
        );
        color: var(--uui-look-positive-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-positive-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-positive-border-radius, var(--uui-border-radius))
        );
        border-color: var(
          --uui-button-border-color,
          var(--uui-look-positive-border)
        );
        font-weight: var(--uui-look-positive-font-weight);
      }
      :host([look='positive']) button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-look-positive-surface-hover)
        );
        color: var(--uui-look-positive-contrast-hover);
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-look-positive-border-hover)
        );
      }
      :host([look='positive']) button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-look-positive-surface-disabled)
        );
        color: var(--uui-look-positive-contrast-disabled);
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-look-positive-border-disabled)
        );
      }

      :host([look='warning']) button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-look-warning-surface)
        );
        color: var(--uui-look-warning-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-warning-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-warning-border-radius, var(--uui-border-radius))
        );
        border-color: var(
          --uui-button-border-color,
          var(--uui-look-warning-border)
        );
        font-weight: var(--uui-look-warning-font-weight);
      }
      :host([look='warning']) button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-look-warning-surface-hover)
        );
        color: var(--uui-look-warning-contrast-hover);
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-look-warning-border-hover)
        );
      }
      :host([look='warning']) button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-look-warning-surface-disabled)
        );
        color: var(--uui-look-warning-contrast-disabled);
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-look-warning-border-disabled)
        );
      }

      :host([look='danger']) button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-look-danger-surface)
        );
        color: var(--uui-look-danger-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-danger-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-danger-border-radius, var(--uui-border-radius))
        );
        border-color: var(
          --uui-button-border-color,
          var(--uui-look-danger-border)
        );
        font-weight: var(--uui-look-danger-font-weight);
      }
      :host([look='danger']) button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-look-danger-surface-hover)
        );
        color: var(--uui-look-danger-contrast-hover);
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-look-danger-border-hover)
        );
      }
      :host([look='danger']) button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-look-danger-surface-disabled)
        );
        color: var(--uui-look-danger-contrast-disabled);
        border-color: var(
          --uui-button-border-color-disabled,
          var(--uui-look-danger-border-disabled)
        );
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
   * @type {""|"primary"|"secondary"|"outline"|"placeholder"|"positive"|"warning"|"danger"}
   * @attr
   * @default ""
   */
  @property({ reflect: true })
  look: InterfaceLookType = InterfaceLookDefaultValue;

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

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
    this.addEventListener('click', this._onHostClick);
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
          this._internals.form.requestSubmit();
          break;
      }
    }
  }

  private _resetStateTimeout?: number;

  // Reset the state after 2sec if it is 'success' or 'failed'.
  updated(changedProperties: any) {
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
        if (!customElements.get('uui-loader-circle')) {
          console.warn(
            'To properly render the waiting state, the uui-loader-circle element has to be registered'
          );
        }
        element = html`<uui-loader-circle id="loader"></uui-loader-circle>`;
        break;
      case 'success':
        element = html`<div id="icon-check" style="">${iconCheck}</div>`;
        break;
      case 'failed':
        element = html`<div id="icon-wrong" style="">${iconWrong}</div>`;
        break;
      default:
        return '';
    }

    return html`<div id="state">${element}</div>`;
  }

  render() {
    return html`
      <button ?disabled=${this.disabled} aria-label="${this.label}">
        ${this.renderState()} ${this.renderLabel()}
        <slot name="extra"></slot>
      </button>
    `;
  }
}
