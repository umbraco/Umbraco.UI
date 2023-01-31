import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { property, state } from 'lit/decorators.js';
import { UUISelectableEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIColorSwatchElement } from '@umbraco-ui/uui-color-swatch/lib/uui-color-swatch.element';

import { UUIColorSwatchesEvent } from './UUIColorSwatchesEvents';

/**
 *  @element uui-color-swatches
 *  @description
 *  @slot - Default slot for content.
 */
@defineElement('uui-color-swatches')
export class UUIColorSwatchesElement extends LitElement {
  static styles = [
    css`
      :host {
        --swatch-size: 1.5rem;

        display: block;
      }
      .color-picker__swatches {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(1.5rem, 1fr));
        grid-gap: 0.5rem;
        justify-items: center;
        padding: 0.75rem;
      }
      .color-picker__swatch {
        position: relative;
        width: var(--swatch-size);
        height: var(--swatch-size);
        border-radius: 3px;
      }

      .color-picker__swatch .color-picker__swatch-color {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: solid 1px rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        cursor: pointer;
      }
    `,
  ];

  @state()
  private _value: string = '';

  @property({ attribute: false }) swatches: string[] = [];

  /**
   * Value of selected option.
   * @type { string }
   * @attr
   * @default ""
   */
  @property({ type: String })
  public get value() {
    return this._value;
  }
  public set value(newValue) {
    if (this._value === newValue) return;

    const oldValue = this._value;
    this._value = newValue;

    this._updateSelection();
    this.requestUpdate('value', oldValue);
  }

  /*protected setValue(e: Event) {

    this.dispatchEvent(new UUIColorSwatchesEvent(UUIColorSwatchesEvent.SELECT));
  }*/

  /**
   * A readable value to display to show the selected value.
   * @type { string }
   * @attr
   * @default ""
   */
  @property({ type: String })
  public displayValue = '';

  private __activeElement: UUIColorSwatchElement | undefined;
  private get _activeElement(): UUIColorSwatchElement | undefined {
    return this.__activeElement;
  }

  private set _activeElement(el: UUIColorSwatchElement | undefined) {
    if (this.__activeElement) {
      this.__activeElement.active = false;
    }
    if (el) {
      el.active = true;
      this.__activeElement = el;
    }
  }

  private _selectedElement: UUIColorSwatchElement | undefined;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener(UUISelectableEvent.SELECTED, this._onSelected);
    this.addEventListener(UUISelectableEvent.UNSELECTED, this._onUnselected);

    demandCustomElement(this, 'uui-color-swatch');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(UUISelectableEvent.SELECTED, this._onSelected);
    this.removeEventListener(UUISelectableEvent.UNSELECTED, this._onUnselected);
  }

  private _updateSelection() {
    this.displayValue = '';

    // Ensure the right items are selected.
    /*for (const option of this._options) {
      if (option.value === this._value) {
        this.displayValue = option.displayValue || '';
        option.selected = true;
      } else {
        option.selected = false;
      }
    }*/
  }

  private _onSelected = (e: Event) => {
    if (this._selectedElement) {
      this._selectedElement.selected = false;
      this._selectedElement.active = false;
      this._selectedElement = undefined;
    }
    this._selectedElement = e.composedPath()[0] as UUIColorSwatchElement;
    this._activeElement = this._selectedElement;

    this.value = this._selectedElement.value || '';
    //this.displayValue = this._selectedElement.displayValue || '';

    this.dispatchEvent(new UUIColorSwatchesEvent(UUIColorSwatchesEvent.CHANGE));
  };

  private _onUnselected = (e: Event) => {
    const el = e.composedPath()[0] as UUIColorSwatchElement;
    if (this._activeElement === el) {
      this._activeElement = undefined;
    }
    if (this._selectedElement === el) {
      this.value = '';
      this.displayValue = '';
      this.dispatchEvent(
        new UUIColorSwatchesEvent(UUIColorSwatchesEvent.CHANGE)
      );
    }
  };

  render() {
    return html`
      <div class="color-picker__swatches">
        ${this.swatches.map(swatch => {
          return html`<uui-color-swatch value="${swatch}"></uui-color-swatch>`;
        })}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatches': UUIColorSwatchesElement;
  }
}
