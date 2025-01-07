import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import { UUICopyEvent } from './UUICopyEvent';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

/**
 * @summary A button to trigger text content to be copied to the clipboard
 * @element uui-copy
 * @dependency uui-button
 * @dependency uui-icon
 * @fires {UUICopyEvent} copying - Fires before the content is about to copied to the clipboard and can be used to transform or modify the data before its added to the clipboard
 * @fires {UUICopyEvent} copied - Fires when the content is copied to the clipboard
 * @slot - Use to replace the default content of 'Copy' and the copy icon
 */
@defineElement('uui-copy')
export class UUICopyElement extends LabelMixin('', LitElement) {
  /**
   * Set a string you wish to copy to the clipboard
   * @type {string}
   * @default ''
   */
  @property({ type: String })
  value = '';

  /**
   * Disables the button
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  disabled = false;

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
  copyFrom = '';

  /**
   * Changes the look of the button to one of the predefined, symbolic looks.
   * @type {"default" | "primary" | "secondary" | "outline" | "placeholder"}
   * @attr
   * @default "default"
   */
  @property()
  look: 'default' | 'primary' | 'secondary' | 'outline' | 'placeholder' =
    'default';

  /**
   * Changes the color of the button to one of the predefined, symbolic colors.
   * @type {"default" | "positive" | "warning" | "danger"}
   * @attr
   * @default "default"
   */
  @property()
  color: 'default' | 'positive' | 'warning' | 'danger' = 'default';

  /**
   * Makes the left and right padding of the button narrower.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  compact = false;

  /**
   * The delay in milliseconds before the button returns to its default state after a successful copy
   * @type {number}
   * @attr
   * @default 250
   */
  @property({ type: Number, attribute: 'animation-state-delay' })
  animationStateDelay = 250;

  constructor() {
    super();
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-icon');
  }

  // Used to store the value that will be copied to the clipboard
  #valueToCopy = '';

  readonly #onClick = async (e: Event) => {
    const button = e.target as UUIButtonElement;
    button.state = 'waiting';

    // By default use the value property
    this.#valueToCopy = this.value;

    // If copy-from is set use that instead
    if (this.copyFrom) {
      // Try & find an element with the ID
      const el = document.getElementById(this.copyFrom);
      if (el) {
        console.log('Element found to copy from', el);
        this.#valueToCopy = el.textContent ?? el.innerText ?? '';

        // Override the value to copy ,if the element has a value property
        // Such as uui-input or uui-textarea or native inout elements
        if ('value' in el) {
          console.log('This element has a value property', el);
          this.#valueToCopy = (el as any).value;
        }
      } else {
        console.error(`Element ID ${this.copyFrom} not found to copy from`);
        button.state = 'failed';
        return;
      }
    }

    const beforeCopyEv = new UUICopyEvent(UUICopyEvent.COPYING, {
      detail: { text: this.#valueToCopy },
    });
    this.dispatchEvent(beforeCopyEv);

    if (beforeCopyEv.detail.text != null) {
      this.#valueToCopy = beforeCopyEv.detail.text;
    }

    await navigator.clipboard
      .writeText(this.#valueToCopy)
      .then(() => {
        this.dispatchEvent(
          new UUICopyEvent(UUICopyEvent.COPIED, {
            detail: { text: this.#valueToCopy },
          }),
        );
        setTimeout(() => {
          button.state = 'success';
        }, this.animationStateDelay);
      })
      .catch(err => {
        button.state = 'failed';
        console.error('Error copying to clipboard', err);
      });
  };

  render() {
    return html` <uui-button
      .color=${this.color}
      .look=${this.look}
      .disabled=${this.disabled}
      .compact=${this.compact}
      .label=${this.label}
      @click=${this.#onClick}>
      <slot> <uui-icon name="copy"></uui-icon> Copy </slot>
    </uui-button>`;
  }

  static readonly styles = [
    css`
      slot {
        pointer-events: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-copy': UUICopyElement;
  }
}
