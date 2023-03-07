import { css, html } from 'lit';
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

    this.style.setProperty('--offset', -this.#getWidth + 'px');
  }

  get #getWidth() {
    return this._dialogElement?.getBoundingClientRect().width ?? 0;
  }

  #onClose(event: Event) {
    event.preventDefault();

    this.style.setProperty('--offset', -this.#getWidth + 'px');
    this.setAttribute('closing', '');

    setTimeout(() => {
      this._dialogElement?.close();
      this.remove();
    }, 250);
  }

  render() {
    return html`<dialog>
      <slot></slot>
    </dialog>`;
  }

  static styles = [
    ...UUIModalElement.styles,
    css`
      dialog {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        max-width: calc(100% - 64px);
        border-left: 1px solid;
        margin-left: auto;
        right: var(--offset);
        transition: right 250ms;
      }
      :host([front]) dialog {
        box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.5);
      }
      :host([size='large']) dialog {
        max-width: min(1200px, 100%);
      }
      :host([size='medium']) dialog {
        max-width: min(800px, 100%);
      }
      :host([size='small']) dialog {
        max-width: min(400px, 100%);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-sidebar': UUIModalSidebarElement;
  }
}
