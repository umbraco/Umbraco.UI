import { css, html } from 'lit';
import { UUIModalElement } from './modal.element.js';
export class UUIModalDialogElement extends UUIModalElement {
  render() {
    return html`
      <div popover="manual" role="dialog" aria-modal="true" aria-label="Dialog">
        <slot></slot>
      </div>
    `;
  }

  static override readonly styles = [
    ...UUIModalElement.styles,
    css`
      :host {
        outline: none;
        --uui-modal-dialog-background: var(--uui-color-surface);
      }
      [popover] {
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: var(
          --uui-modal-dialog-border-radius,
          var(--uui-border-radius-3)
        );
        background: var(
          --uui-modal-dialog-background,
          var(--uui-color-surface)
        );
      }
      :host([index='0']) [popover] {
        box-shadow: var(--uui-shadow-depth-5);
      }
      :host(:not([index='0'])) [popover] {
        outline: 1px solid rgba(0, 0, 0, 0.1);
      }
    `,
  ];
}
