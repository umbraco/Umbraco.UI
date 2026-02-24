import { css, html, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIModalElement } from './uui-modal.element';
import { defineElement } from '../../internal/registration';

export type UUIModalSidebarSize = 'small' | 'medium' | 'large' | 'full';

@defineElement('uui-modal-sidebar')
export class UUIModalSidebarElement extends UUIModalElement {
  /**
   * @attr
   */
  @property({ reflect: true })
  size: UUIModalSidebarSize = 'full';

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>,
  ): void {
    super.firstUpdated(_changedProperties);

    this.style.setProperty('--uui-modal-offset', -this.#getWidth + 'px');
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    super.updated(_changedProperties);

    // if we've reached over X layers of sidebars, hide for better performance.
    // TODO: We could instead hide the sidebars when out of the viewport, but this is a good start.
    if (this.uniqueIndex > 10) {
      this.setAttribute('hide', '');
    } else {
      this.removeAttribute('hide');
    }
  }

  get #getWidth() {
    return this._dialogElement?.getBoundingClientRect().width ?? 0;
  }

  forceClose() {
    if (this.isClosing) return;

    this.isClosing = true;
    this.style.setProperty('--uui-modal-offset', -this.#getWidth + 'px');

    setTimeout(() => {
      super.forceClose();
    }, this.transitionDuration);
  }

  render() {
    return html`<dialog>
      <slot></slot>
    </dialog>`;
  }

  static styles = [
    ...UUIModalElement.styles,
    css`
      :host {
        outline: none;
        --uui-modal-sidebar-left-gap: 24px;
        --uui-modal-sidebar-background: var(--uui-color-surface);
      }
      @media (min-width: 600px) {
        :host {
          --uui-modal-sidebar-left-gap: 64px;
        }
      }
      dialog {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        max-width: calc(100% - var(--uui-modal-sidebar-left-gap));
        margin-left: auto;
        right: var(--uui-modal-offset);
        transition: right var(--uui-modal-transition-duration, 250ms);
        background: var(
          --uui-modal-sidebar-background,
          var(--uui-color-surface)
        );
      }
      :host([index='0']) dialog {
        box-shadow: var(--uui-shadow-depth-5);
      }
      :host(:not([index='0'])) dialog {
        outline: 1px solid rgba(0, 0, 0, 0.1);
      }
      :host([hide]) dialog {
        display: none;
      }
      :host([size='large']) dialog {
        max-width: min(1200px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
      :host([size='medium']) dialog {
        max-width: min(800px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
      :host([size='small']) dialog {
        max-width: min(500px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-sidebar': UUIModalSidebarElement;
  }
}
