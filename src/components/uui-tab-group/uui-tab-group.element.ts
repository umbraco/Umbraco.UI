import { LitElement, html, css } from 'lit';
import { query, property } from 'lit/decorators';
import { UUITabEvent } from '../uui-tab/UUITabEvent';
import { UUITabGroupEvent } from './UUITabGroupEvent';
import { UUITabElement } from '../uui-tab/uui-tab.element';

/**
 *  @element uui-tab-group
 */
export class UUITabGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-interface-border);
      }
    `,
  ];

  render() {
    return html` <slot></slot> `;
  }
}
