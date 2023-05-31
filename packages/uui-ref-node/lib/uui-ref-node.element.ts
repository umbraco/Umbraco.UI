import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { UUIRefElement } from '@umbraco-ui/uui-ref/lib';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 *  @element uui-ref-node
 *  @fires {UUIRefEvent} open - fires when the ref title is clicked
 *  @fires {UUIRefEvent} selected - fires when the ref is selected
 *  @fires {UUIRefEvent} deselected - fires when the ref is deselected
 *  @description - Component for displaying a reference to a generic node.
 *  @slot - for content
 *  @slot icon - for an icon
 *  @slot tag - for a tag
 *  @slot actions - for actions
 */

@defineElement('uui-ref-node')
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
        font-size: var(--uui-type-small-size);
      }

      :host(:not([disabled])) #open-part:hover #icon {
        color: var(--uui-color-interactive-emphasis);
      }
      :host(:not([disabled])) #open-part:hover #name {
        font-weight: 700;
        text-decoration: underline;
        color: var(--uui-color-interactive-emphasis);
      }
      :host(:not([disabled])) #open-part:hover #detail {
        color: var(--uui-color-interactive-emphasis);
      }

      :host([disabled]) #icon {
        color: var(--uui-color-disabled-contrast);
      }
      :host([disabled]) #name {
        color: var(--uui-color-disabled-contrast);
      }
      :host([disabled]) #detail {
        color: var(--uui-color-disabled-contrast);
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

  @state()
  private _iconSlotHasContent = false;

  protected fallbackIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M396.441 138.878l-83.997-83.993-7.331-7.333H105.702v416.701h298.071V146.214l-7.332-7.336zM130.74 439.217V72.591h141.613c37.201 0 19.274 88.18 19.274 88.18s86-20.901 87.104 18.534v259.912H130.74z"></path></svg>';

  connectedCallback() {
    super.connectedCallback();

    demandCustomElement(this, 'uui-icon');
  }

  private _onSlotIconChange(event: Event) {
    this._iconSlotHasContent =
      (event.target as HTMLSlotElement).assignedNodes({ flatten: true })
        .length > 0;
  }

  protected renderDetail() {
    return html`<small id="detail"
      >${this.detail}<slot name="detail"></slot
    ></small>`;
  }

  private _renderFallbackIcon() {
    return html`<uui-icon .svg="${this.fallbackIcon}"></uui-icon>`;
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
        <span id="icon">
          <slot name="icon" @slotchange=${this._onSlotIconChange}></slot>
          ${this._iconSlotHasContent === false
            ? this._renderFallbackIcon()
            : ''}
        </span>
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node': UUIRefNodeElement;
  }
}
