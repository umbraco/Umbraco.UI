import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  A badge to notify that there is something that requires attention of the user. The badge is positioned with `position: absolute`. It will determine its position against the first ancestor with `position: relative`.
 *  @element uui-badge
 *  @slot - The slot for badge contents
 */
@defineElement('uui-badge')
export class UUIBadgeElement extends LitElement {
  static styles = [
    css`
      :host {
        position: var(--uui-badge-position, absolute);
        display: flex;
        justify-content: center;
        align-items: center;

        padding: var(--uui-size-1) var(--uui-size-2);
        inset: var(--uui-badge-inset, -8px -8px auto auto);

        text-align: center;
        font-size: var(--uui-badge-font-size, var(--uui-type-small-size));
        font-weight: 900;
        line-height: 1;

        margin-right: 0;

        min-width: var(--uui-size-8);
        min-height: var(--uui-size-8);
        box-sizing: border-box;

        border-radius: var(--uui-size-4);

        color: var(--uui-color-primary-standalone);
        background-color: var(--uui-color-surface-alt);
      }

      :host([color='primary']) {
        background-color: var(--uui-color-primary);
        color: var(--uui-color-primary-contrast);
      }
      :host([color='positive']) {
        background-color: var(--uui-color-positive);
        color: var(--uui-color-positive-contrast);
      }
      :host([color='warning']) {
        background-color: var(--uui-color-warning);
        color: var(--uui-color-warning-contrast);
      }
      :host([color='danger']) {
        background-color: var(--uui-color-danger);
        color: var(--uui-color-danger-contrast);
      }

      /** TODO: we didn't want to target elements by name, but what else can we do? */
      ::slotted(uui-icon) {
        margin-left: -0.2em;
        margin-right: -0.2em;
      }

      @keyframes --uui-badge-bounce {
        0% {
          transform: translateY(0);
        }
        20% {
          transform: translateY(-6px);
        }
        40% {
          transform: translateY(0);
        }
        55% {
          transform: translateY(-3px);
        }
        70% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(0);
        }
      }
      :host([attention]) {
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-name: --uui-badge-bounce;
        animation-timing-function: ease;
      }
      @media (prefers-reduced-motion) {
        :host([attention]) {
          animation: none;
        }
      }
    `,
  ];

  /**
   * Changes the look of the badge to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" badge.
   * @type {"" | "primary"|"positive"|"warning"|"danger"}
   * @attr
   * @default primary
   */
  @property({ type: String, reflect: true })
  color = '';

  /**
   * Bring attention to this badge by applying a bounce animation.
   * @type Boolean
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  attention = false;

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-badge': UUIBadgeElement;
  }
}
