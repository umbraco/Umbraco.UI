import type { TemplateResult } from 'lit';
import { LitElement, css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { defineElement } from '../../internal/registration/index.js';
import './modal-container.js';
import { ref, createRef } from 'lit/directives/ref.js';
import type { UUIModalElement } from './modal.element.js';

import './modal.js';
import '../dialog-layout/dialog-layout.js';
import '../button/button.js';
import '../box/box.js';
import '../toast-notification/toast-notification.js';
import '../toast-notification-container/toast-notification-container.js';
import '../toast-notification-layout/toast-notification-layout.js';
import { UUIModalOpenEvent } from './modal.element.js';

@defineElement('modal-with-toasts-example')
export class UUIModalWithToastsExampleElement extends LitElement {
  @state()
  private readonly _modals: TemplateResult<1>[] = [];

  private _toastCounter = 0;
  private _dialogCounter = 0;
  private _messageCounter = 0;

  private readonly _onModalOpen = () => {
    const panel = this.shadowRoot?.getElementById('ai-chat-panel');
    if (panel?.matches(':popover-open')) {
      panel.hidePopover();
      panel.showPopover();
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener(UUIModalOpenEvent, this._onModalOpen, true);
    this.updateComplete.then(() => {
      this.shadowRoot?.getElementById('toast-container')?.showPopover();
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(UUIModalOpenEvent, this._onModalOpen, true);
  }

  #addToast() {
    this._toastCounter++;
    const container = this.shadowRoot?.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('uui-toast-notification') as any;
    toast.color = ['', 'positive', 'danger'][Math.floor(Math.random() * 3)];

    const layout = document.createElement(
      'uui-toast-notification-layout',
    ) as any;
    layout.headline = 'Toast #' + this._toastCounter;

    const message = document.createElement('span');
    message.textContent = 'Can you click me while a modal is open?';
    layout.appendChild(message);

    toast.appendChild(layout);
    container.appendChild(toast);

    container.hidePopover();
    container.showPopover();
  }

  #toggleChat() {
    const panel = this.shadowRoot?.getElementById('ai-chat-panel');
    if (!panel) return;

    if (panel.matches(':popover-open')) {
      panel.hidePopover();
    } else {
      panel.showPopover();
    }
  }

  #addMessage() {
    this._messageCounter++;
    const chat = this.shadowRoot?.getElementById('chat-messages');
    if (!chat) return;

    const msg = document.createElement('p');
    msg.textContent = 'Message #' + this._messageCounter + ' - I am working!';
    msg.style.padding = '4px 8px';
    msg.style.borderRadius = '4px';
    msg.style.background = 'var(--uui-color-selected, #e8f0fe)';
    chat.appendChild(msg);
    msg.scrollIntoView({ behavior: 'smooth' });
  }

  #addDialog() {
    this._dialogCounter++;
    const modalRef = createRef<UUIModalElement>();
    const num = this._dialogCounter;
    const maxWidth = Math.max(300, 500 - (num - 1) * 50);

    this._modals.push(html`
      <uui-modal-dialog ${ref(modalRef)}>
        <uui-dialog-layout
          style="max-width: ${maxWidth}px"
          headline="Dialog #${num}">
          <p>A modal dialog is open. Try clicking a toast notification!</p>
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

  #addSidebar(size: 'small' | 'medium' | 'large' | 'full') {
    const modalRef = createRef<UUIModalElement>();

    this._modals.push(html`
      <uui-modal-sidebar ${ref(modalRef)} size=${size}>
        <div
          style="background: var(--uui-color-background); display: flex; flex-direction: column; height: 100%;">
          <uui-box headline="Sidebar" style="margin: 12px">
            <p>A sidebar is open. Try clicking a toast notification!</p>
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
        style="width: max-content; border: 1px solid; padding: 16px; display: flex; flex-direction: column; gap: 8px;">
        <uui-button look="primary" @click=${this.#addToast}>
          Add Toast
        </uui-button>
        <uui-button look="secondary" @click=${this.#toggleChat}>
          Toggle AI Chat
        </uui-button>
        <hr style="width: 100%" />
        <strong>Dialog</strong>
        <uui-button look="secondary" @click=${this.#addDialog}>
          Open
        </uui-button>
        <hr style="width: 100%" />
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
    return html`
      ${this.#renderButtons()}
      <uui-modal-container>${this._modals}</uui-modal-container>
      <uui-toast-notification-container
        id="toast-container"
        auto-close="10000"
        bottom-up
        popover="manual"
        style="position: fixed; inset: 0; height: 100vh; padding: var(--uui-size-layout-1); background: none; border: none;">
      </uui-toast-notification-container>
      <div
        id="ai-chat-panel"
        popover="manual"
        style="position: fixed; top: 0; right: 0; bottom: 0; width: 400px; max-width: 100%; margin: 0; padding: 0; border: none; background: var(--uui-color-surface, #fff); box-shadow: var(--uui-shadow-depth-5); box-sizing: border-box;">
        <div
          style="padding: 16px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column;">
          <div
            style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0;">AI Chat</h3>
            <uui-button look="secondary" compact @click=${this.#toggleChat}
              >✕</uui-button
            >
          </div>
          <div
            id="chat-messages"
            style="flex: 1; overflow: auto; border: 1px solid var(--uui-color-border); border-radius: 4px; padding: 8px; margin-bottom: 8px;">
            <p>Chat messages would appear here...</p>
          </div>
          <uui-button
            look="primary"
            style="align-self: flex-end;"
            @click=${this.#addMessage}
            >Send</uui-button
          >
        </div>
      </div>
    `;
  }

  static override readonly styles = css`
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
