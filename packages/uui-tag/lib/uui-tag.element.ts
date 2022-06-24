import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { InterfaceColor, InterfaceLook } from '@umbraco-ui/uui-base/lib/types';

/**
 *
 *  @element uui-tag
 *  @description Tag component from Umbraco UI components library. Comes in one shape, but different looks and sizes
 *  @slot - slot for tag contents
 *  @cssprop --uui-tag-font-size - overwrite the default font-size for the tag.
 */

@defineElement('uui-tag')
export class UUITagElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-size: var(--uui-tag-font-size, var(--uui-type-small-size));
        font-weight: 700;
        line-height: 1;
        padding: var(--uui-size-space-1) calc(var(--uui-size-space-1) + 0.5em);
        border-radius: 100px;
        user-select: none;
        border-radius: var(--uui-size-4);
        border: 1px solid transparent;
      }

      slot {
        display: flex;
        align-items: center;
        justify-content: center;
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

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {"default" | "positive" | "warning" | "danger"}
   * @attr
   * @default "default"
   */
  @property({ reflect: true })
  color: InterfaceColor = 'default';

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {"default" | "primary" | "secondary" | "outline" | "placeholder"}
   * @attr
   * @default "default"
   */
  @property({ reflect: true })
  look: InterfaceLook = 'primary';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tag': UUITagElement;
  }
}
