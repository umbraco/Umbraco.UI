import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import { UUICopyTextEvent } from './UUICopyTextEvent.js';

/**
 * @summary A button to trigger text content to be copied to the clipboard
 * @element uui-button-copy-text
 * @dependency uui-button
 * @dependency uui-icon
 * @fires {UUICopyTextEvent} copying - Fires before the content is about to copied to the clipboard and can be used to transform or modify the data before its added to the clipboard
 * @fires {UUICopyTextEvent} copied - Fires when the content is copied to the clipboard
 * @slot - Use to replace the default content of the copy icon
 */
@defineElement('uui-button-copy-text')
export class UUIButtonCopyTextElement extends UUIButtonElement {
  /**
   * Set a string you wish to copy to the clipboard
   * @type {string}
   * @default ''
   */
  @property({ type: String })
  text: string = '';

  /**
   * Copies the text content from another element by specifying the ID of the element
   * The ID of the element does not need to start with # like a CSS selector
   * If this property is set, the value property is ignored
   * @type {string}
   * @attr
   * @default ''
   * @example copy-from="element-id"
   */
  @property({ type: String, attribute: 'copy-from' })
  copyFrom: string = '';

  /**
   * The delay in milliseconds before the button returns to its default state after a successful copy
   * @type {number}
   * @attr
   * @default 250
   */
  @property({ type: Number, attribute: 'animation-state-delay' })
  animationStateDelay: number = 250;

  #animationTimer?: any;

  constructor() {
    super();
    demandCustomElement(this, 'uui-icon');

    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.#animationTimer) {
      clearTimeout(this.#animationTimer);
    }
  }

  readonly #onClick = async () => {
    this.state = 'waiting';

    // By default use the value property
    let valueToCopy = this.text;

    // If copy-from is set use that instead
    if (this.copyFrom) {
      // Try & find an element with the ID
      const el = document.getElementById(this.copyFrom);
      if (el) {
        // Override the value to copy, if the element has a value property
        // Such as uui-input or uui-textarea or native input elements
        if ('value' in el) {
          valueToCopy = (el as any).value;
        } else {
          valueToCopy = el.textContent ?? el.innerText ?? '';
        }
      } else {
        console.error(`Element ID ${this.copyFrom} not found to copy from`);
        this.state = 'failed';
        return;
      }
    }

    const beforeCopyEv = new UUICopyTextEvent(UUICopyTextEvent.COPYING);
    beforeCopyEv.text = valueToCopy;
    this.dispatchEvent(beforeCopyEv);

    if (beforeCopyEv.text != null) {
      valueToCopy = beforeCopyEv.text;
    }

    try {
      await navigator.clipboard.writeText(valueToCopy);
      const copiedEv = new UUICopyTextEvent(UUICopyTextEvent.COPIED);
      copiedEv.text = valueToCopy;
      this.dispatchEvent(copiedEv);
      this.#animationTimer = setTimeout(() => {
        this.state = 'success';
      }, this.animationStateDelay);
    } catch (err) {
      this.state = 'failed';
      console.error('Error copying to clipboard', err);
    }
  };

  protected override renderLabel() {
    return html`
      <slot class="label">
        <uui-icon name="copy"></uui-icon>
      </slot>
    `;
  }

  static override readonly styles = UUIButtonElement.styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-button-copy-text': UUIButtonCopyTextElement;
  }
}
