import { UUISelectableEvent } from '../../internal/events';
import { defineElement } from '../../internal/registration';
import type { UUIColorSwatchElement } from '../color-swatch/index.js';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';

import { LabelMixin } from '../../internal/mixins';
import { UUIColorSwatchesEvent } from './UUIColorSwatchesEvent';

//TODO maybe implement multiple selection

/**
 *  Put uui-color-swatch elements inside this element to create a color swatch selector.
 *  @element uui-color-swatches
 *  @slot - Default slot for content.
 *  @fires {UUIColorSwatchesEvent} change - Fires when a color swatch is selected.
 */
@defineElement('uui-color-swatches')
export class UUIColorSwatchesElement extends LabelMixin('label', LitElement) {
  /**
   * Value of selected option.
   *
   * @attr
   */
  @property()
  value = '';

  /**
   * Sets the swatches to disabled.
   * @type {boolean}
   * @attr
   * @default false
   **/
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets the swatches to readonly mode.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly: boolean = false;

  @queryAssignedElements({ selector: 'uui-color-swatch' })
  private readonly _swatches!: Array<UUIColorSwatchElement>;

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
    this.addEventListener(UUISelectableEvent.DESELECTED, this._onDeselected);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
    this.setAttribute('aria-label', this.label);
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    if (_changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }
  }

  private _handleSlotChange() {
    if (!this._swatches || this._swatches.length === 0) return;
    this._swatches.forEach(swatch => {
      swatch.setAttribute('aria-checked', 'false');
      swatch.setAttribute('role', 'radio');

      if (this.disabled) {
        swatch.setAttribute('disabled', '');
      } else {
        // For some reason the value it really wants the attribute to be set not the value. If value is set then it is not reflected properly. :cry:
        swatch.setAttribute('selectable', 'selectable');
      }

      if (this.readonly) {
        swatch.setAttribute('readonly', '');
      }

      if (this.value !== '' && swatch.value === this.value) {
        swatch.selected = true;
        swatch.setAttribute('aria-checked', 'true');
        this._selectedElement = swatch;
        this._activeElement = this._selectedElement;
      }
    });
  }

  private _onSelected = (event: Event) => {
    const target = event.target as UUIColorSwatchElement;
    //react only to selectable events from UUI-Color-Swatch elements
    //? can I use instanceof here instead? that creates a dependency on the uui-color-swatch element
    if (!this._swatches.includes(target)) return;
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

  private _onDeselected = (event: Event) => {
    const target = event.target as UUIColorSwatchElement;
    if (!this._swatches.includes(target)) return;

    if (this._activeElement === target) {
      this._activeElement = undefined;
    }
    if (this._selectedElement === target) {
      this._selectedElement.selected = false;
      this._selectedElement.active = false;
      this._selectedElement = undefined;
      this.value = '';
      this.dispatchEvent(
        new UUIColorSwatchesEvent(UUIColorSwatchesEvent.CHANGE),
      );
    }
  };

  /**
   * Deselects all swatches.
   *
   * @memberof UUIColorSwatchesElement
   */
  resetSelection() {
    this._swatches.forEach(swatch => {
      swatch.selected = false;
      swatch.active = false;
      swatch.selectable = !swatch.disabled;
    });
    this._activeElement = undefined;
    this._selectedElement = undefined;
    this.value = '';
  }

  render() {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatches': UUIColorSwatchesElement;
  }
}
