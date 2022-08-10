import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { UUIComboboxEvent } from './UUIComboboxEvent';
import {
  UUIComboboxListEvent,
  UUIComboboxListElement,
} from '@umbraco-ui/uui-combobox-list/lib';
import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';

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
        background-color: var(
          --uui-combobox-popover-background-color,
          var(--uui-color-surface)
        );
        border: 1px solid var(--uui-color-border);
        border-radius: var(--uui-border-radius);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3);
      }

      #clear-button {
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }

      #clear-button.--show {
        pointer-events: auto;
        opacity: 1;
      }

      #caret {
        margin-right: var(--uui-size-3, 9px);
        display: flex;
        width: 1.15em;
        flex-shrink: 0;
        margin-top: -1px;
      }
    `,
  ];

  get value() {
    return this._value;
  }
  set value(newValue) {
    if (typeof newValue === 'string') {
      this._updateValue(newValue);
    }

    super.value = newValue;
  }

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

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list',
  })
  private _comboboxListElements?: UUIComboboxListElement[];

  private _comboboxList!: UUIComboboxListElement;
  @state()
  private _displayValue = '';

  @state()
  private _search = '';

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('blur', this._onBlur);
    this.addEventListener('mousedown', this._onMouseDown);

    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-input');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-combobox-list');
    demandCustomElement(this, 'uui-scroll-container');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('blur', this._onBlur);
    this.removeEventListener('mousedown', this._onMouseDown);
  }

  protected async firstUpdated() {
    const list = this._comboboxListElements?.[0];

    if (list) {
      this._comboboxList = list;
      this._comboboxList.for = this;
      this._comboboxList.addEventListener(
        UUIComboboxListEvent.CHANGE,
        this._onChange
      );

      if (typeof this.value === 'string') {
        await this.updateComplete;
        this._updateValue(this.value);
      }
    }
  }

  private _updateValue(value: string) {
    if (this._comboboxList) {
      this._comboboxList.value = value;
      this._displayValue = this._comboboxList?.displayValue || '';
    }
  }

  protected getFormElement(): HTMLElement | undefined {
    return this._input;
  }

  private _onMouseDown = () => requestAnimationFrame(() => this._input.focus());
  private _onBlur = () =>
    requestAnimationFrame(() => {
      if (document.activeElement !== this) {
        this._onClose();
      }
    });

  private _onInput = (e: any) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.search = e.target.value;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
    this._open();
  };

  private _onChange = (e: Event) => {
    e.stopImmediatePropagation();

    this.value = this._comboboxList?.value || '';
    this.search = this.value ? this.search : '';

    this._onClose();

    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  private _open = () => {
    if (this.open) return;
    this.open = true;
  };

  private _onClose = () => {
    if (!this.open) return;

    this.open = false;
    this.search = '';
    // Reset input(search-input) value:
    this._input.value = this._displayValue;

    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    if (this.open === false && e.key === 'Enter') {
      e.preventDefault(); // TODO: could we avoid this.
      e.stopImmediatePropagation(); // TODO: could we avoid this.
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      this._open();
    }

    if (e.key === 'Escape' || e.key === 'Enter') {
      this._onClose();
    }
  };

  private _onClear = (e: any) => {
    if (e.key && e.key !== 'Enter') return;

    e.preventDefault(); // TODO: could we avoid this.
    e.stopImmediatePropagation(); // TODO: could we avoid this.

    this.value = '';
    this.search = '';
    // Reset input(search-input) value:
    this._input.value = this._displayValue;

    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  private _renderInput = () => {
    return html` <uui-input
      slot="trigger"
      id="combobox-input"
      label="combobox-input"
      type="text"
      .value=${this._displayValue}
      autocomplete="off"
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
    return html`<uui-button
      id="clear-button"
      class=${this.value || this.search ? '--show' : ''}
      @click=${this._onClear}
      @keydown=${this._onClear}
      label="clear"
      slot="append"
      compact
      style="height: 100%;">
      <uui-icon name="remove" .fallback=${iconRemove.strings[0]}></uui-icon>
    </uui-button>`;
  };

  private _renderDropdown = () => {
    return html`<div id="dropdown" slot="popover">
      <uui-scroll-container id="scroll-container">
        <slot></slot>
      </uui-scroll-container>
    </div>`;
  };

  render() {
    return html`
      <uui-popover
        .open=${this.open}
        .margin=${-1}
        @close=${() => this._onClose()}>
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
