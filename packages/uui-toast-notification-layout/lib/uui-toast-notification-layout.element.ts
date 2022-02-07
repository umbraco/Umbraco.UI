import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 *  @element uui-toast-notification-layout
 *  @description - Component for setting the layout for a toast notification, to be used within toast-notification.
 *  @slot - for content
 *  @slot headline - for headline
 *  @slot actions - for actions
 */
@defineElement('uui-toast-notification-layout')
export class UUIToastNotificationLayoutElement extends LitElement {
  static styles = [
    UUITextStyles,
    css`
      #message > h5 {
      }
      #actions {
        /*
        display: flex;
        width: 100%;
        justify-content: flex-end;
        */
        display: block;
        float: right;

        margin-top: var(--uui-size-space-3);
        margin-bottom: calc(var(--uui-size-space-2) * -1);
      }

      #message::after {
        content: '';
        display: block;
        clear: both;
      }
    `,
  ];

  /**
   * Headline for this notification, can also be set via the 'headline' slot.
   * @type string
   * @attr
   * @default null
   */
  @property({ type: String })
  headline: string | null = null;

  @state()
  private _headlineSlotHasContent = false;

  private _headlineSlotChanged = (e: Event) => {
    this._headlineSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    return html`
      <div id="message" class="uui-text">
        <h5
          style=${this._headlineSlotHasContent || this.headline !== null
            ? ''
            : 'display: none'}>
          ${this.headline}
          <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
        </h5>
        <slot></slot>
        <slot id="actions" name="actions"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification-layout': UUIToastNotificationLayoutElement;
  }
}
