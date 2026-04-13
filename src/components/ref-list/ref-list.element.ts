import { LitElement, html, css } from 'lit';
/**
 * @element uui-ref-list
 */
export class UUIRefListElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static override readonly styles = [
    css`
      :host {
        display: block;
      }

      ::slotted(*:not(:first-child)) {
        margin-top: 1px;
      }
      ::slotted(*:not(:first-child))::before {
        content: '';
        position: absolute;
        top: -1px;
        left: 0;
        right: 0;
        border-top: 1px solid var(--uui-color-border);
      }
    `,
  ];
}
