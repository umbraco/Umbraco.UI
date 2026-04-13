import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type {
  UUIInterfaceColor,
  UUIInterfaceLook,
} from '../../internal/types/index.js';

/**
 *
 *  @element uui-tag
 *  @description Tag component from Umbraco UI components library. Comes in one shape, but different looks and sizes
 *  @slot - slot for tag contents
 *  @cssprop --uui-tag-font-size - overwrite the default font-size for the tag.
 *  @cssprop --uui-tag-padding - overwrite the default padding size for the tag.
 *  @cssprop --uui-tag-border-radius - overwrite the default border-radius for the tag.
 *  @cssprop --uui-tag-border-color - overwrite the default border color for the tag.
 */

export class UUITagElement extends LitElement {
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

  render() {
    return html`<slot></slot>`;
  }

  static override readonly styles = [
    css`
      :host {
        display: inline-block;
        font-size: var(--uui-tag-font-size, var(--uui-type-small-size));
        font-weight: 700;
        line-height: 1;
        padding: var(
          --uui-tag-padding,
          var(--uui-size-space-1) calc(var(--uui-size-space-1) + 0.5em)
        );
        user-select: none;
        border-radius: var(--uui-tag-border-radius, var(--uui-size-4));
        border: 1px solid var(--uui-tag-border-color, transparent);
      }

      slot {
        display: block;
        align-content: center;
        margin: 2px;
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
        background-color: transparent;
        color: var(--color-standalone);
        border-color: var(--color-standalone);
      }
      :host([look='placeholder']) {
        border-style: dashed;
        background-color: transparent;
        color: var(--color-standalone);
        border-color: var(--uui-color-border-standalone);
      }
    `,
  ];
}
