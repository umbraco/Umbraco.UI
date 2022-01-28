import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { UUICardElement } from '@umbraco-ui/uui-card/lib/uui-card.element';

/**
 *  @element uui-card-media
 *  @fires {UUICardEvent} open - fires when the media card title is clicked
 *  @fires {UUICardEvent} selected - fires when the card is selected
 *  @description - Card component for displaying a media item.
 */

export class UUICardMediaElement extends UUICardElement {
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
        background-color: var(--uui-color-white);
        color: var(--uui-color-black);
        border: none;
        cursor: pointer;
        border-top: 1px solid rgba(0, 0, 0, 0.04);
        border-radius: 0 0 var(--uui-border-radius) var(--uui-border-radius);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: inherit;
        font-size: var(--uui-size-4);
        box-sizing: border-box;
        padding: var(--uui-size-2) var(--uui-size-4);
      }

      :host([disabled]) #open-part {
        pointer-events: none;
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
      }

      :host([image]:not([image='']):hover, [image]:not([image='']):focus, [image]:not([image='']):focus-within, [selected][image]:not([image='']), [error][image]:not([image='']))
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

  private queryPreviews(e: any): void {
    this.hasPreview =
      (e.path[0] as HTMLSlotElement).assignedElements({ flatten: true })
        .length > 0;
  }

  protected renderMedia() {
    if (this.hasPreview === false) {
      if (this.fileExt === '') {
        return html`<uui-symbol-folder id="folder-symbol"></uui-symbol-folder>`;
      } else {
        return html`<uui-symbol-file
          id="file-symbol"
          type="${this.fileExt}"></uui-symbol-file>`;
      }
    }
    return '';
  }

  public render() {
    return html` ${this.renderMedia()}
      <slot @slotchange=${this.queryPreviews}></slot>
      <slot name="tag"></slot>
      <slot name="actions"></slot>
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
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>`;
  }
}
