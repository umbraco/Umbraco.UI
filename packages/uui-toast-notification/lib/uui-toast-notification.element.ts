import { LitElement, html, css } from 'lit';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs/';
import { property } from 'lit/decorators.js';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
} from '@umbraco-ui/uui-base/lib/types';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib/uui-text.styles';

/**
 * @element uui-toast-notification
 */
export class UUIToastNotificationElement extends LitElement {
  static styles = [
    UUITextStyles,
    css`
      :host {
        position: relative;
        display: block;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.21);
        background-color: var(--uui-interface-surface);
        padding: var(--uui-size-layout-1);
        padding-right: var(--uui-size-layout-2);
        padding-left: var(--uui-size-layout-3);
        border-radius: calc(var(--uui-border-radius) * 2);

        max-width: 400px;
      }

      #layout {
        display: flex;
        width: 100%;
      }

      #message {
        flex-grow: 1;
      }

      #close {
        flex-grow: 0;
        flex-shrink: 0;
        margin-left: var(--uui-size-space-2);
        margin-top: -7px;
      }

      #close > uui-button {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-padding-left-factor: 1.5;
        --uui-button-padding-right-factor: 1.5;

        margin-right: -6px;
      }

      slot[name='actions'] {
        display: flex;
        width: 100%;
        justify-content: flex-end;
      }

      :host([look='primary']) button {
        background-color: var(--uui-look-primary-surface);
        color: var(--uui-look-primary-contrast);
      }
      :host([look='positive']) button {
        background-color: var(--uui-look-positive-surface);
        color: var(--uui-look-positive-contrast);
      }
      :host([look='warning']) button {
        background-color: var(--uui-look-warning-surface);
        color: var(--uui-look-warning-contrast);
        border-color: var(--uui-look-warning-border);
      }
      :host([look='danger']) {
        background-color: var(--uui-look-danger-surface);
        color: var(--uui-look-danger-contrast);
        border-color: var(--uui-look-danger-border);
      }
    `,
  ];

  /**
   * Changes the look of the notification to one of the predefined, symbolic looks. Example set this to danger for errors.
   * @type {""|"primary"|"positive"|"warning"|"danger"}
   * @attr
   * @default ""
   */
  @property({ reflect: true })
  look: InterfaceLookType = InterfaceLookDefaultValue;

  /**
   * Headline for this notification.
   * @type string
   * @attr
   * @default ""
   */
  @property({ reflect: true })
  headline: string | null = null;

  render() {
    return html`
      <div id="layout">
        <div id="message" class="uui-text">
          ${this.headline ? html`<h5>${this.headline}</h5>` : ''}
          <slot></slot>
        </div>
        <div id="close">
          <uui-button .look=${this.look}>
            <uui-icon
              name="remove"
              .fallback=${iconRemove.strings[0]}></uui-icon>
          </uui-button>
        </div>
      </div>
      <slot name="actions"></slot>
    `;
  }
}
