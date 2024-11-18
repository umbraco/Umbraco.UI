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
    return html`<div
      id="open-part"
      tabindex=${this.disabled ? (nothing as any) : '0'}
      @click=${this.handleOpenClick}
      @keydown=${this.handleOpenKeydown}>
      ${this.#renderContent()}
    </div>`;
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
      <span>${this.name}</span>
      <slot></slot>
    </div>`;
  }

  public render() {
    return html`
      ${this.href ? this.#renderLink() : this.#renderButton()}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>
      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }

  static styles = [
    ...UUICardElement.styles,
    css`
      :host {
        min-width: 250px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
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
        width: 100%;
        padding: var(--uui-size-space-5) var(--uui-size-space-4);
      }

      :host([disabled]) #open-part {
        pointer-events: none;
      }

      #open-part:hover #content > span {
        text-decoration: underline;
        color: var(--uui-color-interactive-emphasis);
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
      }

      #content > span {
        vertical-align: center;
        margin-top: 3px;
        font-weight: 700;
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
