import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
} from '@umbraco-ui/uui-base/lib/types';

export type ButtonState = null | 'waiting' | 'success' | 'failed';
/**
 *  @element uui-button
 *  @fires {UUIButtonEvent} click - fires when the element is clicked
 *  @slot - for button contents
 *  @description - All-round button
 *  @cssprop --uui-button-height - set the button height
 *  @cssprop --uui-button-border-width - set the border width
 *  @cssprop --uui-button-border-color - set the border color
 *  @cssprop --uui-button-border-radius - set the border radius
 *  @cssprop --uui-button-font-weight - set the font weight
 *  @cssprop --uui-button-background-color - set the background color
 *  @cssprop --uui-button-background-color-hover - set the background color for hover state
 *  @cssprop --uui-button-border-color-hover - set the border color for hover state
 *  @cssprop --uui-button-contrast - set the text color
 *  @cssprop --uui-button-contrast-hover - set the text color for hover state
 *  @cssprop --uui-button-background-color-disabled - set the background color for disabled state
 *  @cssprop --uui-button-contrast-disabled - set the text color for disabled state
 */
export class UUIButtonElement extends LabelMixin('', LitElement) {
  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        position: relative;
        display: inline-block;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-slot-padding-l-factor: 3;
        --uui-button-slot-padding-r-factor: 3;
        background-color: var(--uui-interface-surface);
      }

      :host([compact]) {
        --uui-button-slot-padding-l-factor: 1;
        --uui-button-slot-padding-r-factor: 1;
      }

      :host([state]:not([state=''])) span.label {
        opacity: 0;
      }

      span.label {
        transition: opacity 150ms linear;
      }

      #state {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        animation-name: fadeIn;
        animation-delay: 50ms;
        animation-duration: 500ms;
        animation-fill-mode: forwards;
        opacity: 0;
      }

      button {
        height: 100%;
        min-height: var(
          --uui-button-height,
          calc(var(--uui-button-base-unit, var(--uui-size-base-unit)) * 6)
        );
        width: 100%;
        padding: 0;
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
          var(--uui-size-border-radius)
        );
        cursor: pointer;
        font-weight: var(
          --uui-button-font-weight,
          var(--uui-interface-font-weight)
        );
        font-size: inherit;
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
        color: var(
          --uui-button-contrast-disabled,
          var(--uui-interface-contrast-disabled)
        );
        cursor: default;
      }
      button[disabled]:active {
        animation: ${UUIHorizontalShakeAnimationValue};
      }

      button > .label {
        display: block;
        padding: 0
          calc(
            (
              var(--uui-button-base-unit, var(--uui-size-base-unit)) *
                var(--uui-button-slot-padding-r-factor)
            )
          )
          0
          calc(
            (
              var(--uui-button-base-unit, var(--uui-size-base-unit)) *
                var(--uui-button-slot-padding-l-factor)
            )
          );
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
        background-color: var(--uui-look-primary-surface);
        color: var(--uui-look-primary-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-primary-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-primary-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-primary-border);
        font-weight: var(--uui-look-primary-font-weight);
      }
      :host([look='primary']) button:hover {
        background-color: var(--uui-look-primary-surface-hover);
        color: var(--uui-look-primary-contrast-hover);
        border-color: var(--uui-look-primary-border-hover);
      }
      :host([look='primary']) button[disabled] {
        background-color: var(--uui-look-primary-surface-disabled);
        color: var(--uui-look-primary-contrast-disabled);
        border-color: var(--uui-look-primary-border-disabled);
      }

      :host([look='secondary']) button {
        background-color: var(--uui-look-secondary-surface);
        color: var(--uui-look-secondary-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-secondary-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-secondary-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-secondary-border);
        font-weight: var(--uui-look-secondary-font-weight);
      }
      :host([look='secondary']) button:hover {
        background-color: var(--uui-look-secondary-surface-hover);
        color: var(--uui-look-secondary-contrast-hover);
        border-color: var(--uui-look-secondary-border-hover);
      }
      :host([look='secondary']) button[disabled] {
        background-color: var(--uui-look-secondary-surface-disabled);
        color: var(--uui-look-secondary-contrast-disabled);
        border-color: var(--uui-look-secondary-border-disabled);
      }

      :host([look='outline']) button {
        background-color: var(--uui-look-outline-surface);
        color: var(--uui-look-outline-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-outline-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-outline-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-outline-border);
        font-weight: var(--uui-look-outline-font-weight);
      }
      :host([look='outline']) button:hover {
        background-color: var(--uui-look-outline-surface-hover);
        color: var(--uui-look-outline-contrast-hover);
        border-color: var(--uui-look-outline-border-hover);
      }
      :host([look='outline']) button[disabled] {
        background-color: var(--uui-look-outline-surface-disabled);
        color: var(--uui-look-outline-contrast-disabled);
        border-color: var(--uui-look-outline-border-disabled);
      }

      :host([look='placeholder']) button {
        background-color: var(--uui-look-placeholder-surface);
        color: var(--uui-look-placeholder-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-placeholder-border-style, dashed)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(
            --uui-look-placeholder-border-radius,
            var(--uui-size-border-radius)
          )
        );
        border-color: var(--uui-look-placeholder-border);
        font-weight: var(--uui-look-placeholder-font-weight);
      }
      :host([look='placeholder']) button:hover {
        background-color: var(--uui-look-placeholder-surface-hover);
        color: var(--uui-look-placeholder-contrast-hover);
        border-color: var(--uui-look-placeholder-border-hover);
      }
      :host([look='placeholder']) button[disabled] {
        background-color: var(--uui-look-placeholder-surface-disabled);
        color: var(--uui-look-placeholder-contrast-disabled);
        border-color: var(--uui-look-placeholder-border-disabled);
      }

      :host([look='positive']) button {
        background-color: var(--uui-look-positive-surface);
        color: var(--uui-look-positive-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-positive-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-positive-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-positive-border);
        font-weight: var(--uui-look-positive-font-weight);
      }
      :host([look='positive']) button:hover {
        background-color: var(--uui-look-positive-surface-hover);
        color: var(--uui-look-positive-contrast-hover);
        border-color: var(--uui-look-positive-border-hover);
      }
      :host([look='positive']) button[disabled] {
        background-color: var(--uui-look-positive-surface-disabled);
        color: var(--uui-look-positive-contrast-disabled);
        border-color: var(--uui-look-positive-border-disabled);
      }

      :host([look='warning']) button {
        background-color: var(--uui-look-warning-surface);
        color: var(--uui-look-warning-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-warning-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-warning-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-warning-border);
        font-weight: var(--uui-look-warning-font-weight);
      }
      :host([look='warning']) button:hover {
        background-color: var(--uui-look-warning-surface-hover);
        color: var(--uui-look-warning-contrast-hover);
        border-color: var(--uui-look-warning-border-hover);
      }
      :host([look='warning']) button[disabled] {
        background-color: var(--uui-look-warning-surface-disabled);
        color: var(--uui-look-warning-contrast-disabled);
        border-color: var(--uui-look-warning-border-disabled);
      }

      :host([look='danger']) button {
        background-color: var(--uui-look-danger-surface);
        color: var(--uui-look-danger-contrast);
        border-style: var(
          --uui-button-border-style,
          var(--uui-look-danger-border-style, solid)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-look-danger-border-radius, var(--uui-size-border-radius))
        );
        border-color: var(--uui-look-danger-border);
        font-weight: var(--uui-look-danger-font-weight);
      }
      :host([look='danger']) button:hover {
        background-color: var(--uui-look-danger-surface-hover);
        color: var(--uui-look-danger-contrast-hover);
        border-color: var(--uui-look-danger-border-hover);
      }
      :host([look='danger']) button[disabled] {
        background-color: var(--uui-look-danger-surface-disabled);
        color: var(--uui-look-danger-contrast-disabled);
        border-color: var(--uui-look-danger-border-disabled);
      }
    `,
  ];

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
  state: ButtonState = null;

  constructor() {
    super();
    this.addEventListener('click', this.onHostClick);
  }

  private onHostClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (!customElements.get('uui-loader'))
      console.warn(
        'To properly render the waiting state, the uui-loader element has to be registered'
      );
  }

  // Reset the state after 3sec if it is 'success'
  updated(changedProperties: any) {
    if (changedProperties.has('state')) {
      this.disabled = !!this.state;
      if (this.state === 'success' || this.state === 'failed') {
        setTimeout(() => (this.state = null), 2000);
      }
    }
  }

  private __renderState() {
    let element = html``;
    switch (this.state) {
      case 'waiting':
        element = html`<uui-loader-circle size="m"></uui-loader-circle>`;
        break;
      case 'success':
        element = html`<span style="font-size: 24px">✔</span>`;
        break;
      case 'failed':
        element = html`<span style="font-size: 24px; line-height: 1;">🗙</span>`;
        break;
      default:
        return '';
    }

    return html`<div id="state">${element}</div>`;
  }

  render() {
    return html`
      <button ?disabled=${this.disabled} aria-label="${this.label}">
        ${this.renderLabel()} ${this.__renderState()}
      </button>
    `;
  }
}
