import { LitElement, css, html, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import './uui-modal-container';

@customElement('modal-example')
export class ModalExampleElement extends LitElement {
  @query('uui-modal-container')
  modalContainer!: HTMLDivElement;

  @state()
  private _modals: TemplateResult<1>[] = [];

  #addDialog() {
    this._modals.push(html`
      <uui-modal-dialog>
        <uui-dialog-layout style="max-width: 500px" headline="My dialog">
          <p>Dialog content goes here</p>
          ${this.#renderButtons()}
          <uui-button slot="actions">cancel</uui-button>
          <uui-button slot="actions" look="primary">save</uui-button>
        </uui-dialog-layout>
      </uui-modal-dialog>
    `);

    this.requestUpdate('_modals');
  }

  #addSidebar(size: string) {
    this._modals.push(html`
      <uui-modal-sidebar size=${size}>
        <p>Dialog content goes here</p>
        ${this.#renderButtons()}
      </uui-modal-sidebar>
    `);

    this.requestUpdate('_modals');
  }

  #renderButtons() {
    return html`
      <div
        style="width: max-content; border: 1px solid; padding: 16px; display: flex; flex-direction: column;">
        <strong>Dialog</strong>
        <uui-button look="secondary" @click=${this.#addDialog}>Open</uui-button>
        <hr />
        <strong>Sidebars</strong>
        <div>
          <uui-button
            look="secondary"
            @click=${() => this.#addSidebar('small')}>
            small
          </uui-button>
          <uui-button
            look="secondary"
            @click=${() => this.#addSidebar('medium')}>
            medium
          </uui-button>
          <uui-button
            look="secondary"
            @click=${() => this.#addSidebar('large')}>
            large
          </uui-button>
          <uui-button look="secondary" @click=${() => this.#addSidebar('full')}>
            full
          </uui-button>
        </div>
      </div>
    `;
  }

  render() {
    return html` ${this.#renderButtons()}
      <uui-modal-container>${this._modals}</uui-modal-container>`;
  }
  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-example': ModalExampleElement;
  }
}
