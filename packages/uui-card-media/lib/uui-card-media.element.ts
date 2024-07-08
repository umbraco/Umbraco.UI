import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { UUICardElement } from '@umbraco-ui/uui-card/lib';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 *  @element uui-card-media
 *  @description - Card component for displaying a media item.
 *  @slot tag - slot for the tag with support for `<uui-tag>` elements
 *  @slot actions - slot for the actions with support for the `<uui-action-bar>` element
 *  @slot - slot for the default content area
 */
@defineElement('uui-card-media')
export class UUICardMediaElement extends UUICardElement {
  /**
   * Media name
   * @type {string}
   * @attr name
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * Media file extension, without "."
   * @type {string}
   * @attr file-ext
   * @default ''
   */
  @property({ type: String, attribute: 'file-ext' })
  fileExt = '';

  @state()
  protected hasPreview = false;

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-symbol-folder');
    demandCustomElement(this, 'uui-symbol-file');
  }

  private queryPreviews(e: Event): void {
    this.hasPreview =
      (e.composedPath()[0] as HTMLSlotElement).assignedElements({
        flatten: true,
      }).length > 0;
  }

  protected renderMedia() {
    if (this.hasPreview === true) return '';

    if (this.fileExt === '') {
      return html`<uui-symbol-folder id="folder-symbol"></uui-symbol-folder>`;
    }

    return html`<uui-symbol-file
      id="file-symbol"
      type="${this.fileExt}"></uui-symbol-file>`;
  }

  #renderButton() {
    return html`
      <button
        id="open-part"
        tabindex=${this.disabled ? (nothing as any) : '0'}
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}>
        <!--
        TODO: Implement when pop-out is ready
        <uui-icon
          id="info-icon"
          name="info"
          style="color: currentColor">
        </uui-icon>
        -->
        <span>${this.name}</span>
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
        <!--
        TODO: Implement when pop-out is ready
        <uui-icon
          id="info-icon"
          name="info"
          style="color: currentColor">
        </uui-icon>
        -->
        <span>${this.name}</span>
      </a>
    `;
  }

  public render() {
    return html` ${this.renderMedia()}
      <slot @slotchange=${this.queryPreviews}></slot>
      ${this.href ? this.#renderLink() : this.#renderButton()}
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>

      <slot name="tag"></slot>
      <slot name="actions"></slot>`;
  }

  static styles = [
    ...UUICardElement.styles,
    css`
      #file-symbol,
      #folder-symbol {
        align-self: center;
        margin: var(--uui-size-14);
        width: 80%;
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

      slot:not([name])::slotted(*) {
        align-self: center;
        border-radius: var(--uui-border-radius);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      #open-part {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-surface);
        color: var(--uui-color-interactive);
        border: none;
        cursor: pointer;
        border-top: 1px solid var(--uui-color-divider);
        border-radius: 0 0 var(--uui-border-radius) var(--uui-border-radius);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: inherit;
        font-size: var(--uui-type-small-size);
        box-sizing: border-box;
        padding: var(--uui-size-2) var(--uui-size-4);
        text-align: left;
        word-break: break-word;
      }

      :host([disabled]) #open-part {
        pointer-events: none;
        background: var(--uui-color-disabled);
        color: var(--uui-color-contrast-disabled);
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-color-interactive-emphasis);
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
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

      /*
      #info-icon {
        margin-right: var(--uui-size-2);
        display: flex;
        height: var(--uui-size-8);
      }
      */
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-media': UUICardMediaElement;
  }
}
