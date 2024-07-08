import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUICardElement } from '@umbraco-ui/uui-card/lib';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

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
  background?: string;

  render() {
    return html`
      <div
        id="portrait"
        style=${styleMap({ backgroundColor: this.background })}>
        <slot></slot>
      </div>
      ${this.href ? this.#renderLink() : this.#renderButton()}

      <slot name="tag"></slot>
      <slot name="actions"></slot>
    `;
  }

  #renderButton() {
    return html`
      <button
        id="open-part"
        tabindex=${this.disabled ? (nothing as any) : '0'}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        <strong>${this.name}</strong><small>${this.description}</small>
      </button>
    `;
  }

  #renderLink() {
    return html`
      <a
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
        <strong>${this.name}</strong><small>${this.description}</small>
      </a>
    `;
  }

  static styles = [
    ...UUICardElement.styles,
    css`
      :host {
        flex-direction: column;
        justify-content: flex-start;
      }

      :host(:hover) #info {
        color: var(--uui-color-interactive-emphasis);
      }

      #portrait {
        background-color: var(--uui-color-surface-alt);
        display: flex;
        justify-content: center;
        min-height: 150px;
        max-height: 150px;
      }

      slot:not([name])::slotted(*) {
        align-self: center;
        font-size: var(--uui-size-8);
        border-radius: var(--uui-border-radius);
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
      }

      #open-part {
        text-align: left;
        background-color: var(--uui-color-surface);
        cursor: pointer;
        color: var(--uui-color-interactive);
        border: none;
        border-top: 1px solid var(--uui-color-divider);
        border-radius: 0 0 var(--uui-border-radius) var(--uui-border-radius);
        font-family: inherit;
        font-size: var(--uui-type-small-size);
        box-sizing: border-box;
        padding: var(--uui-size-2) var(--uui-size-4);
        display: flex;
        flex-direction: column;
        line-height: var(--uui-size-6);
      }

      :host([disabled]) #open-part {
        pointer-events: none;
        background: var(--uui-color-disabled);
        color: var(--uui-color-contrast-disabled);
      }

      #open-part:hover strong {
        text-decoration: underline;
      }
      #open-part:hover {
        color: var(--uui-color-interactive-emphasis);
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-block-type': UUICardBlockTypeElement;
  }
}
