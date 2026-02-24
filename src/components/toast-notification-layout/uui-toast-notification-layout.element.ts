import { defineElement } from '../../internal/registration';
import { UUITextStyles } from '../../styles';
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
  /**
   * Headline for this notification, can also be set via the 'headline' slot.
   * @attr
   * @default
   */
  @property({ type: String })
  headline: string = '';

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
          style=${this._headlineSlotHasContent ||
          (this.headline && this.headline !== '')
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

  static styles = [
    UUITextStyles,
    css`
      #message {
        margin-bottom: calc(var(--uui-size-space-1) * -1);
      }
      #message::after {
        content: '';
        display: block;
        clear: both;
      }
      #actions {
        /*
        display: flex;
        width: 100%;
        justify-content: flex-end;
        */
        display: block;
        float: right;

        margin-top: var(--uui-size-space-4);
        margin-bottom: calc(var(--uui-size-space-2) * -1);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-toast-notification-layout': UUIToastNotificationLayoutElement;
  }
}
