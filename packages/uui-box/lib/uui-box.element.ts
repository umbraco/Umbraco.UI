import { LitElement, html, css } from 'lit';

/**
 *  A box for grouping elements
 *  @element uui-box
 *  @slot header - header area for title
 *  @slot main - main content area
 *  @slot area with no padding
 *
 */
export class UUIBoxElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        /* TODO: fix automatic fallback values for shadows shadows.*/
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        border-radius: var(--uui-size-border-radius);
        background-color: var(--uui-interface-surface);
      }

      ::slotted([slot='header']) {
        border-bottom: 1px solid var(--uui-interface-border);
      }

      ::slotted([slot='header']),
      ::slotted([slot='main']) {
        padding: var(--uui-size-space-3);
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
