import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { css, html } from 'lit';
import { InputType, UUIInputElement } from '@umbraco-ui/uui-input/lib';
import { property, state } from 'lit/decorators.js';

/**
 * @element uui-input-color
 * @extends uui-input
 */
@defineElement('uui-input-color')
export class UUIInputColorElement extends UUIInputElement {
  @state()
  private inputType: InputType = 'text';

  // this overrides the inherited type property, and moves the input's type handling to the passwordType state.
  @property()
  get type() {
    return this.inputType;
  }
  set type(newValue) {
    this.inputType = newValue;
  }

  onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  }

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-color-swatch');
  }

  renderPrepend() {
    return html`<label id="color-picker">
      <uui-color-swatch
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        .value=${this.value}>
      </uui-color-swatch>
      <input
        type="color"
        id="color-input"
        .value="${this.value}"
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        aria-hidden="true" />
    </label>`;
  }

  static styles = [
    ...UUIInputElement.styles,
    css`
      :host {
      }

      #color-picker {
        cursor: pointer;
        position: relative;
        border-right: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-color-border));
      }

      #color-input {
        visibility: hidden;
        appearance: none;
      }

      uui-color-swatch {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-color': UUIInputColorElement;
  }
}
