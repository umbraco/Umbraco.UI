import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { UUISelectableEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIColorSwatchElement } from '@umbraco-ui/uui-color-swatch/lib/uui-color-swatch.element';

import { UUIColorSwatchesEvent } from './UUIColorSwatchesEvents';

//TODO maybe implement multiple selection

/**
 *  Put uui-stacked-color-swatch elements inside this element to create a color swatch selector.
 *  @element uui-color-swatches
 *  @slot - Default slot for content.
 * @fires {UUIColorSwatchesEvent} change - Fires when a color swatch is selected.
 */
@defineElement('uui-color-swatches')
export class UUIColorSwatchesElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        padding: 0.75rem;
      }
    `,
  ];

  /**
   * Value of selected option.
   * @type { string }
   * @attr
   * @default ""
   */
  @property()
  value = '';

  @queryAssignedElements({ selector: 'uui-color-swatch' })
  swatches!: Array<UUIColorSwatchElement>;

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

  constructor() {
    super();
    this.addEventListener(UUISelectableEvent.SELECTED, this._onSelected);
    this.addEventListener(UUISelectableEvent.UNSELECTED, this._onUnselected);
  }

  private _handleSlotChange() {
    if (!this.swatches || this.swatches.length === 0) return;
    this.swatches.forEach(swatch => {
      //? does it make sense to have non selectable swatches in the swatches element?
      //for some reason the value it really wants the attribute to be set not the value. If value is set then it is not reflected properly. :cry:
      swatch.setAttribute('selectable', 'selectable');

      if (this.value !== '' && swatch.color?.isEqual(this.value)) {
        swatch.selected = true;
        this._selectedElement = swatch;
        this._activeElement = this._selectedElement;
      }
    });
  }

  private _onSelected = (event: Event) => {
    const target = event.target as UUIColorSwatchElement;
    //react only to selectable events from UUI-Color-Swatch elements
    //? can I use instanceof here instead? that creates a dependency on the uui-color-swatch element
    if (!this.swatches.includes(target)) return;
    if (this._selectedElement) {
      this._selectedElement.selected = false;
      this._selectedElement.active = false;
      this._selectedElement = undefined;
    }
    this._selectedElement = target;
    this._activeElement = this._selectedElement;

    this.value = this._selectedElement.value || '';

    this.dispatchEvent(new UUIColorSwatchesEvent(UUIColorSwatchesEvent.CHANGE));
  };

  private _onUnselected = (event: Event) => {
    const target = event.target as UUIColorSwatchElement;
    if (!this.swatches.includes(target)) return;

    if (this._activeElement === target) {
      this._activeElement = undefined;
    }
    if (this._selectedElement === target) {
      this._selectedElement.selected = false;
      this._selectedElement.active = false;
      this._selectedElement = undefined;
      this.value = '';
      this.dispatchEvent(
        new UUIColorSwatchesEvent(UUIColorSwatchesEvent.CHANGE)
      );
    }
  };
  /**
   * Deselects all swatches.
   *
   * @memberof UUIColorSwatchesElement
   */
  resetSelection() {
    this.swatches.forEach(swatch => {
      swatch.selected = false;
      swatch.active = false;
      swatch.selectable = true;
    });
    this._activeElement = undefined;
    this._selectedElement = undefined;
    this.value = '';
  }

  render() {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatches': UUIColorSwatchesElement;
  }
}
