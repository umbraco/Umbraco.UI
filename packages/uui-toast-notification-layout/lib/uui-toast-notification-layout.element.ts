import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib/uui-text.styles';

/**
 *  @element uui-toast-notification-layout
 *  @description - Component for setting the layout for a toast notification, to be used within toast-notification.
 *  @slot - for content
 *  @slot headline - for headline
 *  @slot actions - for actions
 */
export class UUIToastNotificationLayoutElement extends LitElement {
  static styles = [
    UUITextStyles,
    css`
      #message {
        display: block;
        margin-right: calc(
          1em + var(--uui-size-space-2) * 4
        ); /* Must fit width and margin of close button of toast-notification */
      }

      #actions {
        display: flex;
        width: 100%;
        justify-content: flex-end;
      }
    `,
  ];

  /**
   * Headline for this notification, can also be set via the 'headline' slot.
   * @type string
   * @attr
   * @default null
   */
  @property({ reflect: true })
  headline: string | null = null;

  @state()
  private _headlineSlotHasContent = false;

  private _headlineSlotChanged(e: any): void {
    this._headlineSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    return html`
      <div id="message" class="uui-text">
        <h5
          style=${this._headlineSlotHasContent || this.headline !== null
            ? ''
            : 'visibility: hidden'}>
          ${this.headline}
          <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
        </h5>
        <slot></slot>
      </div>
      <slot id="actions" name="actions"></slot>
    `;
  }
}
