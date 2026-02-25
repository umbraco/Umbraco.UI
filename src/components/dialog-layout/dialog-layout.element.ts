import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

/**
 * @element uui-dialog-layout
 * @slot - Use this for the text content
 * @slot headline - Use this for slotted headline
 * @slot actions - Use this for actions
 * @description - Default dialog layout
 */
export class UUIDialogLayoutElement extends LitElement {
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

  /**
   * Renders a h3 with the headline slot nested
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  protected renderHeadline() {
    return html` <h3
      style=${this._headlineSlotHasContent || this.headline !== null
        ? ''
        : 'display: none'}>
      ${this.headline}
      <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
    </h3>`;
  }

  /**
   * Renders default slot
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  protected renderContent() {
    return html`<slot></slot>`;
  }

  /**
   * Renders actions slot
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  protected renderActions() {
    return html`<slot id="actions" name="actions"></slot>`;
  }

  render() {
    return html`${this.renderHeadline()} ${this.renderContent()}
    ${this.renderActions()} `;
  }

  static override readonly styles = [
    css`
      :host {
        display: block;
        padding: var(--uui-size-10) var(--uui-size-14);
        color: var(--uui-color-text);
      }

      #actions {
        margin-top: var(--uui-size-8);
        display: flex;
        justify-content: end;
        gap: var(--uui-size-4);
      }
    `,
  ];
}
