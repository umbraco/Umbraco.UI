import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 *  A box for grouping elements
 *  @element uui-box
 *  @slot header - header area for title
 *  @slot main - main content area
 *  @slot - area with no padding
 *
 */
@defineElement('uui-box')
export class UUIBoxElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        box-shadow: var(--uui-shadow-depth-1);
        border-radius: var(--uui-border-radius);
        background-color: var(--uui-interface-surface);
      }

      ::slotted([slot='header']) {
        border-bottom: 1px solid var(--uui-interface-border);
        padding: var(--uui-size-4) var(--uui-size-5);
      }

      ::slotted([slot='main']) {
        padding: var(--uui-size-5);
      }
    `,
  ];

  render() {
    return html`
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-box': UUIBoxElement;
  }
}
