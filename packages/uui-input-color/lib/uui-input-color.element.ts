import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { css, html } from 'lit';
import { InputType, UUIInputElement } from '@umbraco-ui/uui-input/lib';
import { property, query, state } from 'lit/decorators.js';
import type { UUIColorPickerElement } from '@umbraco-ui/uui-color-picker/lib';

/**
 * @element uui-input-color
 * @extends uui-input
 */
@defineElement('uui-input-color')
export class UUIInputColorElement extends UUIInputElement {
  @state()
  private inputType: InputType = 'text';

  @state()
  private _valueHex = '';

  @query('#color')
  protected _colorPicker!: UUIColorPickerElement;

  @property({ type: String })
  public override set value(value: string) {
    if (value.startsWith('#')) {
      this._valueHex = value;
      super.value = value.substring(1);
    } else {
      super.value = value;
      this._valueHex = `#${value}`;
    }
  }
  public override get value() {
    return super.value as string;
  }

  // this overrides the inherited type property, and moves the input's type handling to the inputType state.
  @property()
  get type() {
    return this.inputType;
  }
  set type(newValue) {
    this.inputType = newValue;
  }

  #onColorClick() {
    this._colorPicker.click();
  }

  #onColorChange(event: Event) {
    event.stopPropagation();
    this.value = this._colorPicker.value;
  }

  connectedCallback(): void {
    super.connectedCallback();

    demandCustomElement(this, 'uui-color-swatch');
  }

  renderPrepend() {
    return html`<div class="color-wrapper">
      <uui-color-swatch
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        value=${this._valueHex}
        @click=${this.#onColorClick}></uui-color-swatch>
      <input
        type="color"
        id="color"
        aria-hidden="true"
        value=${this.value}
        @change=${this.#onColorChange} />
    </div>`;
  }

  static styles = [
    ...UUIInputElement.styles,
    css`
      .color-wrapper {
        display: inline-flex;
        position: relative;
        border-right: var(--uui-input-border-width, 1px) solid
          var(--uui-input-border-color, var(--uui-color-border));
      }

      input[type='color'] {
        appearance: none;
        visibility: hidden;
        width: 0px;
        padding: 0;
        margin: 0;
        position: absolute;
      }

      uui-color-swatch {
        padding: var(--uui-size-1);
      }

      uui-color-swatch:not([disabled]),
      uui-color-swatch:not([readonly]) {
        cursor: pointer;
      }

      uui-color-swatch:focus-within {
        outline: 2px solid var(--uui-color-selected);
        outline-offset: 0;
        border-radius: var(--uui-border-radius);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-color': UUIInputColorElement;
  }
}
