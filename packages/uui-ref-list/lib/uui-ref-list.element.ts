import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

/**
 * @element uui-ref-list
 */
@defineElement('uui-ref-list')
export class UUIRefListElement extends LitElement {
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
        width: 100%;
        border-top: 1px solid lightgrey;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-list': UUIRefListElement;
  }
}
