import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIBaseListItemElement } from '../uui-base-list-item/uui-base-list-item.element';

/**
 *  @element uui-node-list-item
 *  @fires {UUIListItemEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a nodes in general.
 */

export class UUINodeListItemElement extends UUIBaseListItemElement {
  static styles = [
    ...UUIBaseListItemElement.styles,
    css`
      :host {
        min-width: 250px;
        padding: calc(var(--uui-size-space-2) + 1px);
      }

      #open-part {
        align-self: stretch;

        display: flex;
        position: relative;
        align-items: center;
        cursor: pointer;
      }

      #icon {
        font-size: 1.2em;
        margin-left: var(--uui-size-space-2);
        margin-right: var(--uui-size-space-1);
      }

      #info {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        height: 100%;
        padding-left: var(--uui-size-space-2);
      }

      #name {
        font-weight: 700;
      }

      #detail {
        font-size: var(--uui-type-small-size);
      }

      :host(:not([disabled])) #open-part:hover #icon {
        color: var(--uui-interface-contrast-hover);
      }
      :host(:not([disabled])) #open-part:hover #name {
        font-weight: 700;
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }
      :host(:not([disabled])) #open-part:hover #detail {
        color: var(--uui-interface-contrast-hover);
      }

      :host([disabled]) #icon {
        color: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) #name {
        color: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) #detail {
        color: var(--uui-interface-contrast-disabled);
      }
    `,
  ];

  @property({ type: String })
  name = '';

  @property({ type: String })
  detail = '';

  @property({ type: String })
  icon = '';

  protected renderDetail() {
    return html`<small id="detail"
      >${this.detail}<slot name="detail"></slot
    ></small>`;
  }

  public render() {
    return html`
      <button
        type="button"
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
        ?disabled=${this.disabled}>
        <uui-icon id="icon" name=${this.icon}></uui-icon>
        <div id="info">
          <div id="name">${this.name}</div>
          ${this.renderDetail()}
        </div>
      </button>
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot></slot>
      <slot name="tag"></slot>
      <slot name="actions" id="actions-container"></slot>
    `;
  }
}
