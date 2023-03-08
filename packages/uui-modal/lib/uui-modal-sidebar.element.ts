import { css, html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UUIModalElement } from './uui-modal.element';

@customElement('uui-modal-sidebar')
export class UUIModalSidebarElement extends UUIModalElement {
  constructor() {
    super();
    this.addEventListener('close', this.#onClose.bind(this));
  }

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.style.setProperty('--uui-modal-offset', -this.#getWidth + 'px');
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
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

  #onClose(event: Event) {
    event.preventDefault();
    this.isClosing = true;
    this.style.setProperty('--uui-modal-offset', -this.#getWidth + 'px');

    setTimeout(() => {
      this._closeModal();
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
        --uui-modal-sidebar-left-gap: 24px;
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
      }
      :host([unique-index='0']) dialog {
        box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.5);
      }
      :host(:not([unique-index='0'])) dialog {
        outline: 1px solid rgba(0, 0, 0, 0.3);
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
        max-width: min(400px, calc(100% - var(--uui-modal-sidebar-left-gap)));
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-sidebar': UUIModalSidebarElement;
  }
}
