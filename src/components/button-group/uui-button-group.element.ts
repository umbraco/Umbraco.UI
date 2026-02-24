import { defineElement } from '../../internal/registration';
import { css, html, LitElement } from 'lit';

/**
 *  Place <uui-button> elements in the slot. They will be nicely displayed.
 *  @element uui-button-group
 *  @slot - The slot for buttons. It supports `<uui-button>` elements out of the box.
 */
@defineElement('uui-button-group')
export class UUIButtonGroupElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: stretch;
      }

      ::slotted(*) {
        --uui-button-border-radius: 0;
        flex-grow: 1;
      }

      ::slotted([look='outline']:not(:first-child)) {
        --uui-button-merge-border-left: 1;
      }
      ::slotted([look='placeholder']:not(:first-child)) {
        --uui-button-merge-border-left: 1;
      }

      ::slotted(*:first-child) {
        --uui-button-border-radius: var(--uui-border-radius-3) 0 0
          var(--uui-border-radius-3);
      }
      ::slotted(*:last-child) {
        --uui-button-border-radius: 0 var(--uui-border-radius-3)
          var(--uui-border-radius-3) 0;
      }

      ::slotted(*:hover) {
        z-index: 1;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-button-group': UUIButtonGroupElement;
  }
}
