import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUICardElement } from '../uui-card/uui-card.element';

/**
 *  @element uui-user-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @description - Card component for displaying a user node.
 */

export class UUIUserCardElement extends UUICardElement {
  static styles = [
    ...UUICardElement.styles,
    css`
      :host {
        min-width: 250px;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--uui-size-space-3, 12px);
        align-items: center;
      }

      slot:not([name])::slotted(*) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
      }

      ::slotted(*) {
        text-align: center;
      }

      slot[name='tag'] {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        justify-content: right;
      }

      #avatar {
        margin: var(--uui-size-space-3, 12px);
      }

      slot[name='icon']::slotted(*) {
        font-size: 1.2em;
      }

      #open-part {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
        margin: 0 0 3px 0;
      }

      #open-part > span {
        vertical-align: center;
        margin-left: 0.5em;
        margin-top: 3px;
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }
    `,
  ];

  @property({ type: String })
  name = '';

  public render() {
    return html`
      <slot name="tag"></slot>
      <uui-avatar id="avatar" title=${this.name} size="m"></uui-avatar>
      <div
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        <span> ${this.name} </span>
      </div>
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>

      <slot></slot>
    `;
  }
}
