import { LitElement, html, css } from 'lit';
import { defineElement } from '../../internal/registration';

/**
 * @element uui-ref-list
 */
@defineElement('uui-ref-list')
export class UUIRefListElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = [
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-list': UUIRefListElement;
  }
}
