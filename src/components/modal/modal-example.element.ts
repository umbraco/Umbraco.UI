import { LitElement, css, html, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import './uui-modal-container';
import { ref, createRef } from 'lit/directives/ref.js';
import { UUIModalElement } from './uui-modal.element';
import { defineElement } from '../../internal/registration';

@defineElement('modal-example')
export class UUIModalExampleElement extends LitElement {
  @state()
  private _modals: TemplateResult<1>[] = [];

  #addDialog() {
    const modalRef = createRef<UUIModalElement>();

    this._modals.push(html`
      <uui-modal-dialog ${ref(modalRef)}>
        <uui-dialog-layout style="max-width: 500px" headline="My dialog">
          <p>Dialog content goes here</p>
          ${this.#renderButtons()}
          <uui-button
            @click=${() => modalRef.value?.close()}
            slot="actions"
            look="primary">
            close
          </uui-button>
        </uui-dialog-layout>
      </uui-modal-dialog>
    `);

    this.requestUpdate('_modals');
  }

  #addSidebar(size: string) {
    const modalRef = createRef<UUIModalElement>();

    this._modals.push(html`
      <uui-modal-sidebar ${ref(modalRef)} size=${size}>
        <div
          style="background: var(--uui-color-background); display: flex; flex-direction: column; height: 100%;">
          <uui-box headline="Sidebar" style="margin: 12px">
            <p>Sidebar content goes here</p>
            ${this.#renderButtons()}
          </uui-box>
          <div class="sidebar-buttons">
            <uui-button
              @click=${() => modalRef.value?.close()}
              slot="actions"
              look="primary">
              close
            </uui-button>
          </div>
        </div>
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
  static styles = css`
    .sidebar-buttons {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: end;
      padding: 16px;
      background: var(--uui-color-surface);
      box-shadow: var(--uui-shadow-depth-4);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-example': UUIModalExampleElement;
  }
}
