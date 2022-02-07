import { UUICardElement } from '@umbraco-ui/uui-card/lib';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 *  @element uui-card-content-node
 *  @fires {UUICardEvent} open - fires when the card title is clicked
 *  @fires {UUICardEvent} selected - fires when the card is selected
 *  @description - Card component for displaying a content-node.
 */

@defineElement('uui-card-content-node')
export class UUICardContentNodeElement extends UUICardElement {
  static styles = [
    ...UUICardElement.styles,
    css`
      :host {
        min-width: 250px;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--uui-size-3) var(--uui-size-4);
      }

      slot[name='tag'] {
        position: absolute;
        top: var(--uui-size-4);
        right: var(--uui-size-4);
        display: flex;
        justify-content: right;
      }

      slot[name='actions'] {
        position: absolute;
        top: var(--uui-size-4);
        right: var(--uui-size-4);
        display: flex;
        justify-content: right;

        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      slot:not([name]) {
        display: block;
        margin: var(--uui-size-1);
        margin-top: var(--uui-size-3);
      }

      slot:not([name])::slotted(*) {
        font-size: var(--uui-type-small-size);
        line-height: calc(2 * var(--uui-size-3));
      }

      #icon {
        font-size: 1.2em;
        margin-right: var(--uui-size-1);
      }

      #open-part {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
      }

      :host([disabled]) #open-part {
        pointer-events: none;
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }

      #name {
        margin-top: 4px;
      }
    `,
  ];

  /**
   * Node name
   * @type {string}
   * @attr name
   * @default ''
   */
  @property({ type: String })
  name = '';

  @state()
  private _iconSlotHasContent = false;

  protected fallbackIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M396.441 138.878l-83.997-83.993-7.331-7.333H105.702v416.701h298.071V146.214l-7.332-7.336zM130.74 439.217V72.591h141.613c37.201 0 19.274 88.18 19.274 88.18s86-20.901 87.104 18.534v259.912H130.74z"></path></svg>';

  private _onSlotIconChange(event: Event) {
    this._iconSlotHasContent =
      (event.target as HTMLSlotElement).assignedNodes({ flatten: true })
        .length > 0;
  }

  private _renderFallbackIcon() {
    return html`<uui-icon .svg="${this.fallbackIcon}"></uui-icon>`;
  }

  public render() {
    return html`
      <div
        id="open-part"
        tabindex=${this.disabled ? (nothing as any) : 0}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        <span id="icon">
          <slot name="icon" @slotchange=${this._onSlotIconChange}></slot>
          ${this._iconSlotHasContent === false
            ? this._renderFallbackIcon()
            : ''}
        </span>
        <span id="name"> ${this.name} </span>
      </div>
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot></slot>
      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-content-node': UUICardContentNodeElement;
  }
}
