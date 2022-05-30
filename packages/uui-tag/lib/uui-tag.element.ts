import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

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
        background-color: var(--uui-color-surface-alt);
        color: var(--uui-color-interactive);
        user-select: none;
      }

      slot {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2px;
      }

      /** default color */
      :host {
        background-color: var(--uui-color-default);
        color: var(--uui-color-default-contrast);
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
    `,
  ];

  /**
   * Defines the color of the tag.
   * @attr
   * @default primary
   */
  @property({ reflect: true })
  public color = 'primary';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tag': UUITagElement;
  }
}
