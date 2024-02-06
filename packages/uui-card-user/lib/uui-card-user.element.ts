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
      <span> ${this.name} </span>
    </div>`;
  }

  #renderLink() {
    return html`<a
      id="open-part"
      tabindex=${this.disabled ? (nothing as any) : '0'}
      href=${ifDefined(!this.disabled ? this.href : undefined)}
      target=${ifDefined(this.target || undefined)}
      rel=${ifDefined(
        this.target === '_blank' ? 'noopener noreferrer' : undefined,
      )}>
      <span>${this.name}</span>
    </a>`;
  }

  public render() {
    return html`
      ${this._avatarSlotHasContent
        ? nothing
        : html`<uui-avatar
            id="avatar"
            name=${this.name}
            size="m"></uui-avatar>`}
      <slot
        name="avatar"
        id="avatar"
        @slotchange=${this._avatarSlotChanged}></slot>
      ${this.href ? this.#renderLink() : this.#renderButton()}
      <slot></slot>
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
        padding: var(--uui-size-3);
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

      #avatar {
        margin: var(--uui-size-3);
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

      :host([disabled]) #open-part {
        pointer-events: none;
      }

      #open-part > span {
        vertical-align: center;
        margin-top: 3px;
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-color-interactive-emphasis);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-user': UUICardUserElement;
  }
}
