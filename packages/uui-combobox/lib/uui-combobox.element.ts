import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import {
  UUIComboboxListElement,
  UUIComboboxListEvent,
} from '@umbraco-ui/uui-combobox-list/lib';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import { css, html, LitElement } from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';

import { UUIComboboxEvent } from './UUIComboboxEvent';

/**
 * @element uui-combobox
 * @fires {UUIComboboxEvent} input - fires when search input is changed
 * @fires {UUIComboboxEvent} change - fires when selection is changed
 * @slot - for uui-combobox-list-options
 * @slot input-prepend - prepend for the uui-input
 * @slot input-append - append for the uui-input
 * @description - Filterable combobox
 */
@defineElement('uui-combobox')
export class UUIComboboxElement extends FormControlMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      #combobox-input {
        width: 100%;
        border-radius: var(--uui-size-1);
      }

      #scroll-container {
        overflow-y: auto;
        width: 100%;
        max-height: var(--uui-combobox-popover-max-height, 500px);
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

      #caret {
        margin-right: var(--uui-size-3, 9px);
        display: flex;
        width: 1.15em;
        flex-shrink: 0;
        margin-top: -1px;
      }

      :host([disabled]) #caret {
        fill: var(--uui-color-disabled-contrast);
      }

      #phone-wrapper {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        z-index: 1;
        font-size: 1.1em;
      }

      #phone-wrapper #dropdown {
        display: flex;
      }

      #phone-wrapper #combobox-input {
        height: var(--uui-size-16);
      }

      #phone-wrapper > uui-button {
        height: var(--uui-size-14);
        width: 100%;
      }

      #phone-wrapper #scroll-container {
        max-height: unset;
      }
    `,
  ];

  @property({ attribute: 'value', reflect: true })
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

  /**
   * Specifies the button label for the close button in mobile mode
   * @type { string }
   * @attr
   * @default "Close"
   */
  @property({ type: String })
  public closeLabel = 'Close';

  /**
   * Disables the uui-combobox.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @query('#combobox-input')
  private _input!: HTMLInputElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list',
  })
  private _comboboxListElements?: UUIComboboxListElement[];

  private _comboboxList!: UUIComboboxListElement;
  private phoneMediaQuery!: MediaQueryList;

  @state()
  private _displayValue = '';

  @state()
  private _search = '';

  @state()
  private _isPhone = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('blur', this._onBlur);
    this.addEventListener('mousedown', this._onMouseDown);

    this.phoneMediaQuery = window.matchMedia('(max-width: 600px)');
    this._onPhoneChange();
    this.phoneMediaQuery.addEventListener('change', this._onPhoneChange);

    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-input');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-combobox-list');
    demandCustomElement(this, 'uui-scroll-container');
    demandCustomElement(this, 'uui-popover');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('blur', this._onBlur);
    this.removeEventListener('mousedown', this._onMouseDown);
    this.phoneMediaQuery.removeEventListener('change', this._onPhoneChange);
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
      this._comboboxList.addEventListener(
        UUIComboboxListEvent.INNER_SLOT_CHANGE,
        this._onSlotChange
      );

      await this.updateComplete;
      this._updateValue(this.value);
    }
  }

  private _onPhoneChange = () => {
    this._isPhone = this.phoneMediaQuery.matches;
  };

  private _updateValue(value: FormDataEntryValue | FormData) {
    if (this._comboboxList) {
      this._comboboxList.value = value;
      requestAnimationFrame(
        () => (this._displayValue = this._comboboxList.displayValue || '')
      );
    }
  }

  protected getFormElement(): HTMLElement | undefined {
    return this._input;
  }

  private _onMouseDown = () => requestAnimationFrame(() => this._input.focus());

  private _onBlur = () =>
    requestAnimationFrame(() => {
      if (!this.shadowRoot?.activeElement) {
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

  private _onSlotChange = () => {
    if (this.value && this.value !== this._comboboxList?.value) {
      this._updateValue(this.value);
    }
  };

  private _onChange = () => {
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

    this._input.focus();

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
      .disabled=${this.disabled}
      @click=${this._open}
      @input=${this._onInput}
      @keydown=${this._onKeyDown}>
      <slot name="input-prepend" slot="prepend"></slot>
      ${this.disabled ? '' : this._renderClearButton()} ${this._renderCaret()}
      <slot name="input-append" slot="append"></slot>
    </uui-input>`;
  };

  private _renderCaret = () => {
    return html`<svg id="caret" slot="append" viewBox="0 0 512 512">
      <path d="M 255.125 400.35 L 88.193 188.765 H 422.055 Z"></path>
    </svg>`;
  };

  private _renderClearButton = () => {
    return this.value || this.search
      ? html`<uui-button
          id="clear-button"
          @click=${this._onClear}
          @keydown=${this._onClear}
          label="clear"
          slot="append"
          compact
          style="height: 100%;">
          <uui-icon name="remove" .fallback=${iconRemove.strings[0]}></uui-icon>
        </uui-button>`
      : '';
  };

  private _renderDropdown = () => {
    return html`<div id="dropdown" slot="popover">
      <uui-scroll-container tabindex="-1" id="scroll-container">
        <slot></slot>
      </uui-scroll-container>
    </div>`;
  };

  render() {
    if (this._isPhone && this.open) {
      return html` <div id="phone-wrapper">
        <uui-button label="close" look="primary" @click=${this._onClose}>
          ${this.closeLabel}
        </uui-button>
        ${this._renderInput()} ${this._renderDropdown()}
      </div>`;
    } else {
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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox': UUIComboboxElement;
  }
}
