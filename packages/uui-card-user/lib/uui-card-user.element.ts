import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import {
  demandCustomElement,
  slotHasContent,
} from '@umbraco-ui/uui-base/lib/utils';
import { UUICardElement } from '@umbraco-ui/uui-card/lib';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 *  @element uui-card-user
 *  @description - Card component for displaying a user node.
 *  @slot - slot for the default content area
 *  @slot tag - slot for the tag with support for `<uui-tag>` elements
 *  @slot avatar - slot for the avatar with support for the `<uui-avatar>` element
 *  @slot actions - slot for the actions with support for the `<uui-action-bar>` element
 */
@defineElement('uui-card-user')
export class UUICardUserElement extends UUICardElement {
  /**
   * User name
   * @type {string}
   * @attr name
   * @default ''
   */
  @property({ type: String })
  name = '';

  @state()
  private _avatarSlotHasContent = false;
  private _avatarSlotChanged = (e: Event) => {
    this._avatarSlotHasContent = slotHasContent(e.target);
  };

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-avatar');
  }

  #renderButton() {
    const tabIndex = !this.disabled ? (this.selectOnly ? -1 : 0) : undefined;
    return html`
      <div
        id="open-part"
        tabindex=${ifDefined(tabIndex)}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        ${this.#renderContent()}
      </div>
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

  #renderContent() {
    return html`<div id="content">
      ${this._avatarSlotHasContent
        ? nothing
        : html`<uui-avatar
            class="avatar"
            name=${this.name}
            size="m"></uui-avatar>`}
      <slot
        name="avatar"
        class="avatar"
        @slotchange=${this._avatarSlotChanged}></slot>
      <span title="${this.name}">${this.name}</span>
      <slot></slot>
    </div>`;
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

  static styles = [
    ...UUICardElement.styles,
    css`
      :host {
        min-width: 250px;
      }

      slot:not([name])::slotted(*) {
        font-size: var(--uui-type-small-size);
        line-height: var(--uui-size-6);
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

      slot[name='actions'] {
        position: absolute;
        top: var(--uui-size-space-4);
        right: var(--uui-size-space-4);
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

      #open-part {
        cursor: pointer;
        flex-grow: 1;
        padding: var(--uui-size-space-5) var(--uui-size-space-4);
      }

      :host([disabled]) #open-part {
        pointer-events: none;
      }

      #open-part:hover #content {
        color: var(--uui-color-interactive-emphasis);
      }
      #open-part:hover #content > span {
        text-decoration: underline;
      }

      :host([selectable]) #open-part {
        padding: 0;
        margin: var(--uui-size-space-5) var(--uui-size-space-4);
      }

      #content {
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        margin: 0 0 3px 0;
        height: 100%;
      }

      #content > span {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: center;
        margin-top: 3px;
        font-weight: 700;
        overflow-wrap: anywhere;
      }

      .avatar {
        font-size: 1.5em;
        margin-top: var(--uui-size-space-1);
        margin-bottom: var(--uui-size-space-2);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-user': UUICardUserElement;
  }
}
