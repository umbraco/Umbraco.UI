import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIRefElement } from '@umbraco-ui/uui-ref/lib/uui-ref.element';

/**
 *  @element uui-ref-node
 *  @fires {UUIRefEvent} click-title - fires when the ref title is clicked
 *  @description - Component for displaying a reference to a generic node.
 *  @slot - for content
 *  @slot icon - for an icon
 *  @slot tag - for a tag
 *  @slot actions - for actions
 */

export class UUIRefNodeElement extends UUIRefElement {
  static styles = [
    ...UUIRefElement.styles,
    css`
      :host {
        min-width: 250px;
        padding: calc(var(--uui-size-2) + 1px);
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
        margin-left: var(--uui-size-2);
        margin-right: var(--uui-size-1);
      }

      #info {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        height: 100%;
        padding-left: var(--uui-size-2);
      }

      #name {
        font-weight: 700;
      }

      #detail {
        font-size: var(--uui-size-4);
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

  /**
   * Node name
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * Node details
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  detail = '';

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
        <span id="icon"><slot name="icon"></slot></span>
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
