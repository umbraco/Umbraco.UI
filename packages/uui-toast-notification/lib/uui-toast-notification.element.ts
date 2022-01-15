import { LitElement, html, css } from 'lit';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs/';
import { property } from 'lit/decorators.js';

/**
 * @element uui-toast-notification
 */
export class UUIToastNotificationElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        background-color: var(--uui-interface-surface);
        padding: var(--uui-size-layout-1);
        padding-left: var(--uui-size-layout-2);
        border-radius: var(--uui-border-radius);

        max-width: 400px;
      }

      #close {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-padding-left-factor: 2;
        --uui-button-padding-right-factor: 2;
        float: right;
        margin-top: -7px;
      }

      #message {
        float: left;
      }

      slot[name='actions'] {
        display: flex;
        align-items: flex-end;
      }
    `,
  ];

  @property({ type: String })
  headline: string | null = null;

  render() {
    return html`
      <uui-button id="close"
        ><uui-icon name="remove" .fallback=${iconRemove.strings[0]}></uui-icon
      ></uui-button>
      <slot id="message"></slot>
      <slot name="actions"></slot>
    `;
  }
}
