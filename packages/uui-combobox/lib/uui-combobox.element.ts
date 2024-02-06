import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import {
  UUIComboboxListElement,
  UUIComboboxListEvent,
} from '@umbraco-ui/uui-combobox-list/lib';
import { iconRemove } from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import type { UUIPopoverContainerElement } from '@umbraco-ui/uui-popover-container/lib';
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
 * @cssprop --uui-dropdown-width - overwrite the dropdown width
 * @description - Filterable combobox
 */
@defineElement('uui-combobox')
export class UUIComboboxElement extends FormControlMixin(LitElement) {
  @property({ attribute: 'value', reflect: true })
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (typeof newValue === 'string') {
      this.#updateValue(newValue);
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
  public get open() {
    return this._isOpen;
  }
  public set open(newValue: boolean) {
    const oldValue = newValue;
    this._isOpen = newValue;
    const popover = this._comboboxPopoverElement;
    if (popover) {
      if (newValue) {
        const width = this._inputElement.offsetWidth;
        popover.style.setProperty('--popover-width', `${width}px`);
        popover.showPopover();
      } else {
        popover.hidePopover();
      }
    }

    this.requestUpdate('open', oldValue);
  }

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
  private _inputElement!: HTMLInputElement;

  @query('#combobox-popover')
  private _comboboxPopoverElement?: UUIPopoverContainerElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list',
  })
  private _comboboxListElements?: UUIComboboxListElement[];

  #comboboxList!: UUIComboboxListElement;
  #phoneMediaQuery!: MediaQueryList;

  @state()
  private _displayValue = '';

  @state()
  private _search = '';

  @state()
  private _isPhone = false;

  @state()
  private _isOpen = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('blur', this.#onBlur);
    this.addEventListener('mousedown', this.#onMouseDown);

    this.#phoneMediaQuery = window.matchMedia('(max-width: 600px)');
    this.#onPhoneChange();
    this.#phoneMediaQuery.addEventListener('change', this.#onPhoneChange);

    demandCustomElement(this, 'uui-icon');
    demandCustomElement(this, 'uui-input');
    demandCustomElement(this, 'uui-button');
    demandCustomElement(this, 'uui-combobox-list');
    demandCustomElement(this, 'uui-scroll-container');
    demandCustomElement(this, 'uui-popover-container');
    demandCustomElement(this, 'uui-symbol-expand');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('blur', this.#onBlur);
    this.removeEventListener('mousedown', this.#onMouseDown);
    this.#phoneMediaQuery.removeEventListener('change', this.#onPhoneChange);
  }

  protected async firstUpdated() {
    const list = this._comboboxListElements?.[0];

    if (list) {
      this.#comboboxList = list;
      this.#comboboxList.for = this;
      this.#comboboxList.addEventListener(
        UUIComboboxListEvent.CHANGE,
        this.#onChange,
      );
      this.#comboboxList.addEventListener(
        UUIComboboxListEvent.INNER_SLOT_CHANGE,
        this.#onSlotChange,
      );

      await this.updateComplete;
      this.#updateValue(this.value);
    }
  }

  #onPhoneChange = () => {
    this._isPhone = this.#phoneMediaQuery.matches;
  };

  #updateValue(value: FormDataEntryValue | FormData) {
    if (this.#comboboxList) {
      this.#comboboxList.value = value;
      requestAnimationFrame(
        () => (this._displayValue = this.#comboboxList.displayValue || ''),
      );
    }
  }

  protected getFormElement(): HTMLElement | undefined {
    return this._inputElement;
  }

  #onMouseDown = () => requestAnimationFrame(() => this._inputElement.focus());

  #onBlur = () =>
    requestAnimationFrame(() => {
      if (!this.shadowRoot?.activeElement) {
        this.#onClose();
      }
    });

  #onInput = (e: any) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.search = e.target.value;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
    this.#onOpen();
  };

  #onSlotChange = () => {
    if (this.value && this.value !== this.#comboboxList?.value) {
      this.#updateValue(this.value);
    }
  };

  #onChange = () => {
    this.value = this.#comboboxList?.value || '';
    this.search = this.value ? this.search : '';

    this.#onClose();
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  #onToggle = () => {
    this.open = !this.open;
  };

  #onOpen = () => {
    if (this.open) return;
    this.open = true;
  };

  #onClose = () => {
    if (!this.open) return;

    this.open = false;
    this.search = '';
    // Reset input(search-input) value:
    this._inputElement.value = this._displayValue;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
  };

  #onKeyDown = (e: KeyboardEvent) => {
    if (this.open === false && e.key === 'Enter') {
      e.preventDefault(); // TODO: could we avoid this.
      e.stopImmediatePropagation(); // TODO: could we avoid this.
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      this.#onOpen();
    }

    if (e.key === 'Escape' || e.key === 'Enter') {
      this.#onClose();
    }
  };

  #onClear = (e: any) => {
    if (e.key && e.key !== 'Enter') return;

    e.preventDefault(); // TODO: could we avoid this.
    e.stopImmediatePropagation(); // TODO: could we avoid this.

    this.value = '';
    this.search = '';
    // Reset input(search-input) value:
    this._inputElement.value = this._displayValue;

    this._inputElement.focus();

    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  #renderInput = () => {
    return html` <uui-input
      slot="trigger"
      id="combobox-input"
      label="combobox-input"
      type="text"
      .value=${this._displayValue}
      autocomplete="off"
      .disabled=${this.disabled}
      popovertarget="combobox-popover"
      @click=${this.#onToggle}
      @input=${this.#onInput}
      @keydown=${this.#onKeyDown}>
      <slot name="input-prepend" slot="prepend"></slot>
      ${this.disabled ? '' : this.#renderClearButton()}
      <div id="expand-symbol-wrapper" slot="append">
        <uui-symbol-expand .open=${this._isOpen}></uui-symbol-expand>
      </div>
      <slot name="input-append" slot="append"></slot>
    </uui-input>`;
  };

  #renderClearButton = () => {
    return this.value || this.search
      ? html`<uui-button
          id="clear-button"
          @click=${this.#onClear}
          @keydown=${this.#onClear}
          label="clear"
          slot="append"
          compact
          style="height: 100%;">
          <uui-icon name="remove" .fallback=${iconRemove.strings[0]}></uui-icon>
        </uui-button>`
      : '';
  };

  #renderDropdown = () => {
    return html`<div id="dropdown">
      <uui-scroll-container tabindex="-1" id="scroll-container">
        <slot></slot>
      </uui-scroll-container>
    </div>`;
  };

  render() {
    if (this._isPhone && this.open) {
      return html` <div id="phone-wrapper">
        <uui-button label="close" look="primary" @click=${this.#onClose}>
          ${this.closeLabel}
        </uui-button>
        ${this.#renderInput()} ${this.#renderDropdown()}
      </div>`;
    } else {
      return html`
        ${this.#renderInput()}
        <uui-popover-container
          id="combobox-popover"
          popover="manual"
          placement="bottom-end">
          ${this.#renderDropdown()}
        </uui-popover-container>
      `;
    }
  }

  static styles = [
    css`
      :host {
        display: inline-block;
      }

      #combobox-input {
        width: 100%;
        border-radius: var(--uui-size-1);
      }

      #combobox-popover {
        width: var(--uui-dropdown-width, var(--popover-width, inherit));
      }

      #scroll-container {
        overflow-y: auto;
        width: 100%;
        max-height: var(--uui-combobox-popover-max-height, 500px);
      }
      #expand-symbol-wrapper {
        height: 100%;
        padding-right: var(--uui-size-space-3);
        display: flex;
        justify-content: center;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox': UUIComboboxElement;
  }
}
