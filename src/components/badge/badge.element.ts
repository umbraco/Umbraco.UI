import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type {
  UUIInterfaceColor,
  UUIInterfaceLook,
} from '../../internal/types/index.js';

/**
 *  A badge to notify that there is something that requires attention of the user. The badge is positioned with `position: absolute`. It will determine its position against the first ancestor with `position: relative`.
 *  @element uui-badge
 *  @slot - The slot for badge contents
 */

export class UUIBadgeElement extends LitElement {
  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {"default" | "positive" | "warning" | "danger"}
   * @attr
   * @default "default"
   */
  @property({ reflect: true })
  color: UUIInterfaceColor = 'default';

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {"default" | "primary" | "secondary" | "outline" | "placeholder"}
   * @attr
   * @default "default"
   */
  @property({ reflect: true })
  look: UUIInterfaceLook = 'primary';

  /**
   * Bring attention to this badge by applying a bounce animation.
   * @type boolean
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  attention: boolean = false;

  render() {
    return html` <slot></slot> `;
  }

  static override readonly styles = [
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
        border: 1px solid transparent;
      }

      :host {
        --color: var(--uui-color-default);
        --color-standalone: var(--uui-color-default-standalone);
        --color-contrast: var(--uui-color-default-contrast);
      }
      :host([color='positive']) {
        --color: var(--uui-color-positive);
        --color-standalone: var(--uui-color-positive-standalone);
        --color-contrast: var(--uui-color-positive-contrast);
      }
      :host([color='warning']) {
        --color: var(--uui-color-warning);
        --color-standalone: var(--uui-color-warning-standalone);
        --color-contrast: var(--uui-color-warning-contrast);
      }
      :host([color='danger']) {
        --color: var(--uui-color-danger);
        --color-standalone: var(--uui-color-danger-standalone);
        --color-contrast: var(--uui-color-danger-contrast);
      }
      :host([color='invalid']) {
        --color: var(--uui-color-invalid);
        --color-standalone: var(--uui-color-invalid-standalone);
        --color-contrast: var(--uui-color-invalid-contrast);
      }

      :host {
        background-color: var(--uui-color-surface);
        color: var(--color-standalone);
        border-color: transparent;
      }
      :host([look='primary']) {
        background-color: var(--color);
        color: var(--color-contrast);
        border-color: transparent;
      }
      :host([look='secondary']) {
        background-color: var(--uui-color-surface-alt);
        color: var(--color-standalone);
        border-color: transparent;
      }
      :host([look='outline']) {
        background-color: var(--uui-color-surface);
        color: var(--color-standalone);
        border-color: var(--color-standalone);
      }
      :host([look='placeholder']) {
        border-style: dashed;
        background-color: var(--uui-color-surface);
        color: var(--color-standalone);
        border-color: var(--uui-color-border-standalone);
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
}
