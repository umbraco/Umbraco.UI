import { UUIFormControlWithBasicsMixin } from '../../internal/mixins/index.js';
import type {
  UUIComboboxListElement,
  UUIComboboxListOptionElement,
} from '../combobox-list/combobox-list.js';
import { UUIComboboxListEvent } from '../combobox-list/combobox-list.js';
import { iconRemove } from '../icon-registry-essential/svgs/index.js';
import type { UUIPopoverContainerElement } from '../popover-container/popover-container.js';
import { css, html, LitElement, nothing } from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';

import { UUIComboboxEvent } from './UUIComboboxEvent.js';

import '../input/input.js';
import '../symbol-expand/symbol-expand.js';
import '../button/button.js';
import '../icon/icon.js';
import '../scroll-container/scroll-container.js';
import '../popover-container/popover-container.js';
import '../tag/tag.js';

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
export class UUIComboboxElement extends UUIFormControlWithBasicsMixin(
  LitElement,
  '',
) {
  @property({ attribute: 'value', reflect: true })
  set value(newValue) {
    super.value = newValue;

    if (typeof newValue === 'string') {
      this.#updateValue();
    }
  }
  get value() {
    return super.value;
  }

  /**
   * The search input.
   * @type {string}
   * @attr
   * @default ""
   */
  @property({ type: String })
  public set search(newValue) {
    if (this.search === newValue) return;
    const oldValue = this._search;
    this._search = newValue;
    this.requestUpdate('search', oldValue);
  }
  public get search() {
    return this._search;
  }

  /**
   * Specifies if the popover should be open.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  public set open(newValue: boolean) {
    const oldValue = newValue;
    this._isOpen = newValue;
    const popover = this._comboboxPopoverElement;
    if (popover) {
      if (newValue) {
        const width = this._input.offsetWidth;
        popover.style.setProperty('--popover-width', `${width}px`);
        popover.showPopover();
      } else {
        popover.hidePopover();
      }
    }

    this.requestUpdate('open', oldValue);
  }
  public get open() {
    return this._isOpen;
  }

  /**
   * Specifies the button label for the close button in mobile mode
   * @type {string}
   * @attr
   * @default "Close"
   */
  @property({ type: String, attribute: 'close-label' })
  public closeLabel = 'Close';

  /**
   * Disables the uui-combobox.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Enables multiple selection mode.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Removes the expand symbol.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: false, attribute: 'hide-expand-symbol' })
  hideExpandSymbol = false;

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Defines the input placeholder.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  @query('#combobox-input')
  private readonly _input!: HTMLInputElement;

  @query('#combobox-popover')
  private readonly _comboboxPopoverElement?: UUIPopoverContainerElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list',
  })
  private readonly _comboboxListElements?: UUIComboboxListElement[];

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

  @state()
  private _selectedItems: Array<{ value: string; displayValue: string }> = [];

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('blur', this.#onBlur);
    this.addEventListener('mousedown', this.#onMouseDown);

    this.#phoneMediaQuery = window.matchMedia('(max-width: 600px)');
    this.#onPhoneChange();
    this.#phoneMediaQuery.addEventListener('change', this.#onPhoneChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('blur', this.#onBlur);
    this.removeEventListener('mousedown', this.#onMouseDown);
    this.#phoneMediaQuery.removeEventListener('change', this.#onPhoneChange);
  }

  #onSlotChange() {
    if (this.#comboboxList) {
      this.#comboboxList.removeEventListener(
        UUIComboboxListEvent.CHANGE,
        this.#onChange,
      );
      this.#comboboxList.removeEventListener(
        UUIComboboxListEvent.INNER_SLOT_CHANGE,
        this.#onInnerSlotChange,
      );
    }
    const list = this._comboboxListElements?.[0];

    if (list) {
      this.#comboboxList = list;
      this.#comboboxList.for = this;
      this.#comboboxList.multiple = this.multiple;
      this.#comboboxList.addEventListener(
        UUIComboboxListEvent.CHANGE,
        this.#onChange,
      );
      this.#comboboxList.addEventListener(
        UUIComboboxListEvent.INNER_SLOT_CHANGE,
        this.#onInnerSlotChange,
      );
    }

    this.updateComplete.then(() => {
      this.#updateValue();
    });
  }

  readonly #onPhoneChange = () => {
    this._isPhone = this.#phoneMediaQuery.matches;
  };

  #updateValue() {
    if (this.#comboboxList) {
      this.#comboboxList.value = this.value;
      requestAnimationFrame(
        () => (this._displayValue = this.#comboboxList.displayValue || ''),
      );
    }
  }

  protected getFormElement(): HTMLElement | undefined {
    return this._input;
  }

  async focus() {
    await this.updateComplete;
    this._input.focus();
  }
  async blur() {
    await this.updateComplete;
    this._input.blur();
  }
  async click() {
    await this.updateComplete;
    this._input.click();
  }

  readonly #onMouseDown = () =>
    requestAnimationFrame(() => this._input.focus());

  readonly #onBlur = () =>
    requestAnimationFrame(() => {
      if (!this.shadowRoot?.activeElement) {
        this.#onClose();
      }
    });

  readonly #onInput = (e: any) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.search = e.target.value;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
    this.#onOpen();
  };

  readonly #onInnerSlotChange = () => {
    if (this.value && this.value !== this.#comboboxList?.value) {
      this.#updateValue();
    }
  };

  readonly #onChange = () => {
    const list = this.#comboboxList;
    if (!list) return;

    if (list.multiple) {
      this._selectedItems = list.selectedValues.map((val, i) => ({
        value: val,
        displayValue: list.selectedDisplayValues[i] || val,
      }));
      this.value = list.selectedValues.join(',');

      this.search = '';
      this._input.value = '';
      this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
    } else {
      this.value = list.value || '';
      this.search = this.value ? this.search : '';
      this.#onClose();
    }
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  readonly #onToggle = () => {
    if (this.readonly) return;
    this.open = !this.open;
  };

  readonly #onOpen = () => {
    if (this.open) return;
    if (this.readonly) return;
    this.open = true;
  };

  readonly #onClose = () => {
    if (!this.open) return;

    this.open = false;
    this.search = '';
    // Reset input(search-input) value:
    this._input.value = this._displayValue;
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
  };

  readonly #onKeyDown = (e: KeyboardEvent) => {
    if (
      e.code === 'Backspace' &&
      this.multiple &&
      this._selectedItems.length > 0 &&
      this.search === ''
    ) {
      const lastItem = this._selectedItems[this._selectedItems.length - 1];
      this.#onRemoveTag(e, lastItem.value);
      return;
    }
    if (this.open === false && e.code === 'Enter') {
      e.preventDefault(); // Prevent form submission when combobox is closed
      e.stopImmediatePropagation(); // Don't let list handle Enter when closed
    }

    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      this.#onOpen();
    }

    if (e.code === 'Space') {
      if (this._isOpen) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      this.#onOpen();
    }

    if (e.code === 'Escape') {
      this.#onClose();
    }
  };

  readonly #onClear = (e: any) => {
    if (e.key && e.key !== 'Enter') return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const list = this.#comboboxList;
    if (list?.multiple) {
      // Deselect all options
      for (const el of list.querySelectorAll<UUIComboboxListOptionElement>(
        'uui-combobox-list-option[selected]',
      )) {
        el.selected = false;
      }
      list.resetSelection();
      this._selectedItems = [];
    }

    this.value = '';
    this.search = '';
    this._input.value = this._displayValue;

    this._input.focus();

    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.SEARCH));
    this.dispatchEvent(new UUIComboboxEvent(UUIComboboxEvent.CHANGE));
  };

  readonly #onRemoveTag = (e: Event, value: string) => {
    e.stopPropagation(); // Don't let this trigger the input click/toggle

    const list = this.#comboboxList;
    if (!list) return;

    const options = list.querySelectorAll('uui-combobox-list-option');
    for (const option of options) {
      if (option.value === value && option.selected) {
        option.click(); // Triggers SelectableMixin's toggle → fires DESELECTED → list updates arrays
        break;
      }
    }
  };

  readonly #renderInput = () => {
    return html`<uui-input
      slot="trigger"
      id="combobox-input"
      label="combobox-input"
      type="text"
      .value=${this._displayValue}
      .placeholder=${this.placeholder}
      autocomplete="off"
      .disabled=${this.disabled}
      .readonly=${this.readonly}
      popovertarget="combobox-popover"
      @click=${this.#onToggle}
      @input=${this.#onInput}
      @keydown=${this.#onKeyDown}>
      <slot name="input-prepend" slot="prepend"></slot>
      ${this.#renderSelectedTags()} ${this.#renderClearButton()}
      ${this.hideExpandSymbol || this.multiple
        ? nothing
        : html`<div id="expand-symbol-wrapper" slot="append">
            <uui-symbol-expand .open=${this._isOpen}></uui-symbol-expand>
          </div>`}
      <slot name="input-append" slot="append"></slot>
    </uui-input>`;
  };

  readonly #renderClearButton = () => {
    if (this.disabled) return nothing;
    if (this.readonly) return nothing;
    if (this.multiple) return nothing;

    return html`<uui-button
      id="clear-button"
      @click=${this.#onClear}
      @keydown=${this.#onClear}
      label="clear"
      slot="append"
      compact
      style="height: 100%;"
      tabindex=${this.value || this.search || this._selectedItems.length > 0
        ? ''
        : '-1'}
      class=${this.value || this.search || this._selectedItems.length > 0
        ? 'visible'
        : ''}>
      <uui-icon name="remove" .fallback=${iconRemove.strings[0]}></uui-icon>
    </uui-button>`;
  };

  readonly #renderSelectedTags = () => {
    if (this._selectedItems.length === 0) return nothing;

    return html` ${this._selectedItems.map(
      item =>
        html`<uui-tag look="secondary">
          ${item.displayValue}
          <uui-button
            compact
            label="Remove ${item.displayValue}"
            @click=${(e: Event) => this.#onRemoveTag(e, item.value)}>
            <uui-icon
              name="remove"
              .fallback=${iconRemove.strings[0]}></uui-icon>
          </uui-button>
        </uui-tag>`,
    )}`;
  };

  readonly #renderDropdown = () => {
    return html`<div id="dropdown">
      <uui-scroll-container tabindex="-1" id="scroll-container">
        <slot @slotchange=${this.#onSlotChange}></slot>
      </uui-scroll-container>
    </div>`;
  };

  render() {
    if (this._isPhone && this.open) {
      return html`<div id="phone-wrapper">
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

  static override readonly styles = [
    css`
      :host {
        display: inline-flex;
      }

      #combobox-input {
        width: 100%;
        border-radius: var(--uui-border-radius-3);
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

      #clear-button {
        opacity: 0;
        transition: opacity 80ms;
      }

      :host(:not([disabled]):not([readonly]):focus-within)
        #clear-button.visible,
      :host(:not([disabled]):not([readonly]):hover) #clear-button.visible {
        opacity: 1;
      }

      #dropdown {
        overflow: hidden;
        z-index: -1;
        background-color: var(
          --uui-combobox-popover-background-color,
          var(--uui-color-surface)
        );
        border: 1px solid var(--uui-color-border);
        border-radius: var(--uui-border-radius-3);
        width: 100%;
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

      :host([multiple]) #combobox-input {
        --uui-input-height: auto;
        min-height: var(--uui-size-11);
      }
      :host([multiple]) uui-tag {
        display: inline-flex;
        align-items: center;
        gap: 2px;
      }

      :host([multiple]) uui-tag uui-button {
        font-size: 10px;
      }
    `,
  ];
}
