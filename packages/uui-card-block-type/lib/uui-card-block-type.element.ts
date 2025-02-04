import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUICardElement } from '@umbraco-ui/uui-card/lib';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type BlockTypeIcon = {
  name?: string;
  color?: string;
};

/**
 * @element uui-card-block-type
 * @slot - slot for the default content area
 * @slot tag - slot for the tag with support for `<uui-tag>` elements
 * @slot actions - slot for the actions with support for the `<uui-action-bar>` element
 */
@defineElement('uui-card-block-type')
export class UUICardBlockTypeElement extends UUICardElement {
  /**
   * Block type name
   * @type {string}
   * @attr name
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * Block type description
   * @type {string}
   * @attr description
   * @default undefined
   */
  @property({ type: String })
  description?: string;

  @property({ type: String, attribute: 'background' })
  public get background(): string | undefined {
    return undefined;
  }
  public set background(value: string | undefined) {
    this.style.backgroundColor = value ?? '';
  }

  render() {
    return html`
      ${this.#renderMedia()}
      ${this.href ? this.#renderLink() : this.#renderButton()}
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }

  #renderButton() {
    return html`
      <button
        id="open-part"
        class="uui-text"
        tabindex=${this.disabled ? (nothing as any) : '0'}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        ${this.#renderContent()}
      </button>
    `;
  }

  #renderLink() {
    return html`
      <a
        id="open-part"
        class="uui-text"
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
      </a>
    `;
  }

  #renderMedia() {
    return html`<div id="portrait">
      <slot></slot>
    </div> `;
  }

  #renderContent() {
    return html`
      <div id="content">
        <span id="name">${this.name}</span>
        <small>${this.description}<slot name="description"></slot></small>
      </div></div>
    `;
  }

  static styles = [
    ...UUICardElement.styles,
    css`
      :host {
        background-color: var(--uui-color-surface-alt);
      }

      slot[name='tag'] {
        position: absolute;
        top: var(--uui-size-4);
        right: var(--uui-size-4);
        display: flex;
        justify-content: right;
        z-index: 2;
      }

      slot[name='actions'] {
        position: absolute;
        top: var(--uui-size-4);
        right: var(--uui-size-4);
        display: flex;
        justify-content: right;
        z-index: 2;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      #portrait {
        display: flex;
        justify-content: center;
        min-height: 150px;
        max-height: 150px;
        width: 100%;
        margin-bottom: var(--uui-size-layout-2);
      }

      slot:not([name])::slotted(*) {
        align-self: center;
        border-radius: var(--uui-border-radius);
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
        font-size: var(--uui-size-8);
      }

      #open-part {
        position: absolute;
        z-index: 1;
        inset: 0;
        color: var(--uui-color-interactive);
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      :host([disabled]) #open-part {
        pointer-events: none;
        background: var(--uui-color-disabled);
        color: var(--uui-color-contrast-disabled);
      }

      #open-part:hover {
        color: var(--uui-color-interactive-emphasis);
      }
      #open-part:hover #name {
        text-decoration: underline;
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
      }

      #content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        font-family: inherit;
        font-size: var(--uui-type-small-size);
        box-sizing: border-box;
        text-align: left;
        word-break: break-word;
        padding-top: var(--uui-size-space-3);
      }

      #content::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        border-top: 1px solid var(--uui-color-divider);
        border-radius: 0 0 var(--uui-border-radius) var(--uui-border-radius);
        background-color: var(--uui-color-surface);
        pointer-events: none;
        opacity: 0.96;
      }

      :host(:focus) slot[name='actions'],
      :host(:focus-within) slot[name='actions'],
      :host(:hover) slot[name='actions'] {
        opacity: 1;
      }

      :host(
          [image]:not([image='']):hover,
          [image]:not([image='']):focus,
          [image]:not([image='']):focus-within,
          [selected][image]:not([image='']),
          [error][image]:not([image=''])
        )
        #open-part {
        opacity: 1;
        transition-duration: 120ms;
        transition-delay: 0s;
      }

      :host([selectable]) #open-part {
        inset: var(--uui-size-space-3) var(--uui-size-space-4);
      }
      :host(:not([selectable])) #content {
        padding: var(--uui-size-space-3) var(--uui-size-space-4);
      }
      :host([selectable]) #content::before {
        inset: calc(var(--uui-size-space-3) * -1)
          calc(var(--uui-size-space-4) * -1);
        top: 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-block-type': UUICardBlockTypeElement;
  }
}
