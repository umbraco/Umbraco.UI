import { demandCustomElement } from '../../internal/utils/index.js';
import { UUICardElement } from '../card/card.js';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 *  @element uui-card-content-node
 *  @description - Card component for displaying a content-node.
 *  @slot - slot for the default content area
 *  @slot icon - slot for the icon with support for `<uui-icon>` elements
 *  @slot tag - slot for the tag with support for `<uui-tag>` elements
 *  @slot actions - slot for the actions with support for the `<uui-action-bar>` element
 */
export class UUICardContentNodeElement extends UUICardElement {
  /**
   * Node name
   * @type {string}
   * @attr name
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

  protected fallbackIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    id="icon">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>`;

  private _onSlotIconChange(event: Event) {
    this._iconSlotHasContent =
      (event.target as HTMLSlotElement).assignedNodes({ flatten: true })
        .length > 0;
  }

  private _renderFallbackIcon() {
    demandCustomElement(this, 'uui-icon');
    return html`<uui-icon .svg="${this.fallbackIcon}"></uui-icon>`;
  }

  protected renderDetail() {
    return html`<small id="detail"
        >${this.detail}<slot name="detail"></slot></small
      ><slot id="default"></slot>`;
  }

  #renderContent() {
    return html`
      <span id="content" class="uui-text">
        <span id="item">
          <span id="icon">
            <slot name="icon" @slotchange=${this._onSlotIconChange}></slot>
            ${this._iconSlotHasContent === false
              ? this._renderFallbackIcon()
              : ''}
          </span>
          <div title="${this.name}" id="name">
            ${this.name}<slot name="name"></slot>
          </div>
        </span>
        ${this.renderDetail()}
      </span>
    `;
  }

  #renderButton() {
    const tabIndex = !this.disabled ? (this.selectOnly ? -1 : 0) : undefined;
    return html`
      <button
        id="open-part"
        tabindex=${ifDefined(tabIndex)}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        ${this.#renderContent()}
      </button>
    `;
  }

  #renderLink() {
    const tabIndex = !this.disabled ? (this.selectOnly ? -1 : 0) : undefined;
    const rel = this.target === '_blank' ? 'noopener noreferrer' : undefined;
    return html`
      <a
        id="open-part"
        tabindex=${ifDefined(tabIndex)}
        href=${ifDefined(!this.disabled ? this.href : undefined)}
        target=${ifDefined(this.target || undefined)}
        rel=${ifDefined(this.rel || rel)}>
        ${this.#renderContent()}
      </a>
    `;
  }

  public render() {
    return html`
      ${this.href ? this.#renderLink() : this.#renderButton()}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>
      ${this.selectable ? this.renderCheckbox() : nothing}
      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }

  static override readonly styles = [
    ...UUICardElement.styles,
    css`
      :host {
        min-width: 250px;
        flex-direction: column;
        justify-content: space-between;
      }

      slot[name='tag'] {
        position: absolute;
        bottom: var(--uui-size-4);
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

      #open-part {
        display: flex;
        position: relative;
        align-items: center;
        cursor: pointer;
        flex-grow: 1;
        padding: var(--uui-size-space-4) var(--uui-size-space-5);
      }

      #open-part #name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
      }

      #content {
        align-self: stretch;
        display: flex;
        flex-direction: column;
      }

      #item {
        position: relative;
        display: flex;
        align-self: stretch;
        line-height: normal;
        align-items: center;
        margin-top: var(--uui-size-1);
      }

      #icon {
        font-size: 1.2em;
        margin-right: var(--uui-size-1);
      }

      :host([selectable]) #open-part {
        padding: 0;
        margin: var(--uui-size-space-4) var(--uui-size-space-5);
      }

      :host([disabled]) #name {
        pointer-events: none;
      }

      :host(:not([disabled])) #open-part:hover #icon {
        color: var(--uui-color-interactive-emphasis);
      }
      :host(:not([disabled])) #open-part:hover #name {
        text-decoration: underline;
        color: var(--uui-color-interactive-emphasis);
      }
      :host(:not([disabled])) #open-part:hover #detail {
        color: var(--uui-color-interactive-emphasis);
      }
      :host(:not([disabled])) #open-part:hover #default {
        color: var(--uui-color-interactive-emphasis);
      }

      #select-checkbox {
        top: var(--uui-size-5);
        left: var(--uui-size-6);
      }
    `,
  ];
}
