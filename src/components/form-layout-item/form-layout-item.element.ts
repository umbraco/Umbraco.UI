import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import '../form-validation-message/form-validation-message.js';

// TODO: Make sure validation messages can be seen for the whole Form Item. Make them follow the screen if form controls are taller than available screen height.

/**
 * @element uui-form-layout-item
 * @description - Form item composes label, input and validation-messages in a proper layout.
 * @slot - for button contents
 * @slot message - for extras in the messages container
 * @slot description - for extras in the description container
 * @slot label - for label contents
 */

export class UUIFormLayoutItemElement extends LitElement {
  /*
  @property({type: String})
  label: string | null = null;
  */

  @property({ type: String })
  description: string | null = null;

  @state()
  private _labelSlotHasContent = false;

  private readonly _labelSlotChanged = (e: Event) => {
    this._labelSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  @state()
  private _descriptionSlotHasContent = false;

  private readonly _descriptionSlotChanged = (e: Event) => {
    this._descriptionSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    return html`
      <div id="label" style=${this._labelSlotHasContent ? '' : 'display: none'}>
        <slot name="label" @slotchange=${this._labelSlotChanged}></slot>
      </div>
      <div
        id="description"
        style=${this._descriptionSlotHasContent || this.description !== null
          ? ''
          : 'display: none'}>
        ${this.description}
        <slot
          name="description"
          @slotchange=${this._descriptionSlotChanged}></slot>
      </div>
      <uui-form-validation-message>
        <slot></slot>
        <slot name="message" slot="message"></slot>
      </uui-form-validation-message>
    `;
  }

  static override readonly styles = [
    css`
      :host {
        position: relative;
        display: block;
        margin-top: var(--uui-size-space-5);
        margin-bottom: var(--uui-size-space-5);
      }
      #label {
        margin-top: -5px;
        margin-bottom: 5px;
      }
      #description {
        color: var(--uui-color-disabled-contrast);
        font-size: var(--uui-type-small-size);
      }
      #label + #description {
        margin-top: -8px;
        min-height: 8px;
      }
    `,
  ];
}
