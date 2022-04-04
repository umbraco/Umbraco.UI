import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import { property, query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { UUIComboboxEvent } from './UUIComboboxEvent';
import {
  UUIComboboxListOptionElement,
  UUIComboboxListEvent,
} from '@umbraco-ui/uui-combobox-list/lib';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins/FormControlMixin';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import { UUISelectableEvent } from 'packages/uui-base/lib/events';

/**
 * @element uui-combobox
 * @fires {UUIComboboxEvent} input - fires when search input is changed
 * @fires {UUIComboboxEvent} change - fires when selection is changed
 * @slot default - for uui-combobox-list-options
 * @slot input-prepend - prepend for the uui-input
 * @slot input-append - append for the uui-input
 * @description - Filterable combobox
 */
@defineElement('uui-combobox')
export class UUIComboboxElement extends FormControlMixin(LitElement) {
  static styles = [
    css`
      :host {
        position: relative;
        display: inline-block;
      }

      #combobox-input {
        width: 100%;
        border-radius: var(--uui-size-1);
      }

      #scroll-container {
        max-height: var(--uui-combobox-popover-max-height, 500px);
        overflow-y: auto;
      }

      #dropdown {
        overflow: hidden;
        z-index: -1;
        background-color: var(--uui-combobox-popover-background-color, white);
        border: 1px solid var(--uui-interface-border);
        border-radius: var(--uui-border-radius);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3);
      }

      #caret {
        margin-right: var(--uui-size-3, 9px);
        display: flex;
        width: 18px;
        flex-shrink: 0;
        margin-top: -1px;
      }
    `,
  ];

  /**
   * The search input.
   * @type { string }
   * @attr
   * @default ""
   */
  @property({ type: String })
  public get search() {
    return this._search;
  }
  public set search(newValue) {
    if (this.search === newValue) return;
    const oldValue = this._search;
    this._search = newValue;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.INPUT));
    this.requestUpdate('search', oldValue);
  }

  /**
   * Specifies if the popover should be open.
   * @type { boolean }
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  public open = false;

  @query('#combobox-input')
  private _input!: HTMLInputElement;

  @state()
  private _displayValue = '';

  @state()
  private _search = '';

  private _selectedElement: UUIComboboxListOptionElement | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
    this.addEventListener('blur', this._onBlur);
    this.addEventListener('mousedown', this._onMouseDown);
    this.addEventListener(UUISelectableEvent.SELECTED, this._close);
    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-input');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-combobox-list');
    demandCustomElement(this, 'uui-scroll-container');
    demandCustomElement(this, 'uui-caret');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
    this.removeEventListener('blur', this._onBlur);
    this.removeEventListener('mousedown', this._onMouseDown);
    this.removeEventListener(UUISelectableEvent.SELECTED, this._close);
  }

  protected getFormElement(): HTMLElement | undefined {
    return this._input;
  }

  private _onMouseDown = () => requestAnimationFrame(() => this._input.focus());
  private _onBlur = () =>
    requestAnimationFrame(() => {
      if (document.activeElement !== this) {
        this._close();
      }
    });

  private _onFocus = () => '';

  private _onInput = (e: any) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.search = e.target.value;
    this._open();
  };

  private _onChange = (e: UUIComboboxListEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    this._selectedElement = e.composedPath()[0] as UUIComboboxListOptionElement;
    const newValue = this._selectedElement?.value;

    this.value = newValue || '';
    this.search = this.value ? this.search : '';
    this._displayValue = this._selectedElement?.displayValue;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  private _open = () => {
    if (this.open) return;
    this.open = true;
  };

  private _close = () => {
    if (!this.open) return;

    this.open = false;
    this._displayValue = this._selectedElement?.displayValue || '';

    this._input.value = this._displayValue;
    this.search = '';
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    if (this.open === false && e.key === 'Enter') {
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      this._open();
    }
  };

  private _clear = (e: any) => {
    if (e.key && e.key !== 'Enter') return;

    e.preventDefault();
    e.stopImmediatePropagation();

    this._displayValue = '';
    this._input.value = this._displayValue;
    this.search = '';
    this.value = '';
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  private _renderInput = () => {
    return html` <uui-input
      slot="trigger"
      id="combobox-input"
      label="combobox-input"
      type="text"
      .value=${this._displayValue}
      .placeholder=${this._displayValue}
      @click=${this._open}
      @input=${this._onInput}
      @keydown=${this._onKeyDown}>
      <slot name="input-prepend" slot="prepend"></slot>
      ${this._renderClearButton()} ${this._renderCaret()}
      <slot name="input-append" slot="append"></slot>
    </uui-input>`;
  };

  private _renderCaret = () => {
    return html`<svg id="caret" slot="append" viewBox="0 0 512 512">
      <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
    </svg>`;
  };

  private _renderClearButton = () => {
    if (this.value || this.search) {
      return html`<uui-button
        @click=${this._clear}
        @keydown=${this._clear}
        label="clear"
        slot="append"
        compact
        style="height: 100%; --uui-button-padding-top-factor:0; --uui-button-padding-bottom-factor:0;">
        <uui-icon name="remove" .fallback=${iconRemove.strings[0]}></uui-icon>
      </uui-button>`;
    } else {
      return '';
    }
  };

  private _renderDropdown = () => {
    return html`<div id="dropdown" slot="popover">
      <uui-scroll-container id="scroll-container">
        <uui-combobox-list .value=${this.value} @change=${this._onChange}>
          <slot></slot>
        </uui-combobox-list>
      </uui-scroll-container>
    </div>`;
  };

  render() {
    return html`
      <uui-popover
        .open=${this.open}
        .margin=${10}
        @close=${() => this._close()}>
        ${this._renderInput()} ${this._renderDropdown()}
      </uui-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox': UUIComboboxElement;
  }
}