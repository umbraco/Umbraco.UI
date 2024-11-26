import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { ifDefined } from 'lit/directives/if-defined.js';
import { UUIRefElement } from '@umbraco-ui/uui-ref/lib';
import { css, html, nothing } from 'lit';
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

  /**
   * Set an href, this will turns the name of the card into an anchor tag.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public href?: string;

  /**
   * Set an anchor tag target, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public target?: '_blank' | '_parent' | '_self' | '_top';

  /**
   * Set the rel attribute for an anchor tag, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public rel?: string;

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

  connectedCallback() {
    super.connectedCallback();

    demandCustomElement(this, 'uui-icon');
  }

  #onSlotIconChange(event: Event) {
    this._iconSlotHasContent =
      (event.target as HTMLSlotElement).assignedNodes({ flatten: true })
        .length > 0;
  }

  protected renderDetail() {
    return html`<small id="detail"
      >${this.detail}<slot name="detail"></slot
    ></small>`;
  }

  #renderFallbackIcon() {
    return html`<uui-icon .svg="${this.fallbackIcon}"></uui-icon>`;
  }

  #renderContent() {
    return html`
      <span id="content">
        <span id="icon">
          <slot name="icon" @slotchange=${this.#onSlotIconChange}></slot>
          ${this._iconSlotHasContent === false
            ? this.#renderFallbackIcon()
            : ''}
        </span>
        <div id="info">
          <div id="name">${this.name}<slot name="name"></slot></div>
          ${this.renderDetail()}
        </div>
      </span>
    `;
  }

  #renderLink() {
    return html`<a
      id="open-part"
      tabindex=${this.disabled ? (nothing as any) : '0'}
      href=${ifDefined(!this.disabled ? this.href : undefined)}
      target=${ifDefined(this.target || undefined)}
      rel=${ifDefined(
        this.rel ||
          ifDefined(
            this.target === '_blank' ? 'noopener noreferrer' : undefined,
          ),
      )}>
      ${this.#renderContent()}
    </a>`;
  }

  #renderButton() {
    return html`
      <button
        type="button"
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
        ?disabled=${this.disabled}>
        ${this.#renderContent()}
      </button>
    `;
  }

  public render() {
    return html`
      ${this.#renderOpenPart()}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot></slot>
      <slot name="tag" id="tag-container"></slot>
      <slot name="actions" id="actions-container"></slot>
    `;
  }

  #renderOpenPart() {
    if (this.readonly) {
      return html`${this.#renderContent()}`;
    } else {
      return this.href ? this.#renderLink() : this.#renderButton();
    }
  }

  static styles = [
    ...UUIRefElement.styles,
    css`
      :host {
        min-width: 250px;
        padding: 1px;
      }

      #content {
        align-self: stretch;
        line-height: normal;
        display: flex;
        position: relative;
        align-items: center;
      }

      #open-part {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        align-self: stretch;
        display: flex;
        flex-grow: 1;
        padding: calc(var(--uui-size-2));
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

      #detail {
        font-size: var(--uui-type-small-size);
      }

      :host([selectable]) #open-part {
        flex-grow: 0;
        padding: 0;
        margin: calc(var(--uui-size-2));
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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-ref-node': UUIRefNodeElement;
  }
}
