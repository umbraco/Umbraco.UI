import { css, html, LitElement } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { UUISelectableEvent } from '../../internal/events/index.js';
import type { UUIComboboxListOptionElement } from './combobox-list-option.element.js';
import { UUIComboboxListEvent } from './UUIComboboxListEvent.js';

/**
 * @element uui-combobox-list
 * @fires {UUIComboboxListEvent} change - fires when selection is changed
 * @slot - for uui-combobox-list-options
 * @description - A list that uses uui-combobox-list-options and handles keyboard navigation and selection.
 */
export class UUIComboboxListElement extends LitElement {
  /**
   * Value of selected option.
   * @type {FormDataEntryValue | FormData}
   * @attr
   * @default ""
   */
  @property()
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

  /**
   * A readable value to display to show the selected value.
   * @type {string}
   * @attr
   * @default ""
   */
  @property({ type: String })
  public displayValue = '';

  @property({ type: Boolean, reflect: true })
  multiple = false;

  private _for?: HTMLElement;
  /**
   * provide another element of which keyboard navigation
   * @type {HTMLElement}
   * @attr
   * @default this
   */
  @property({ attribute: false })
  public get for() {
    return this._for;
  }
  public set for(newValue: HTMLElement | undefined) {
    if (this._for) {
      this._for.removeEventListener('keydown', this._onKeyDown);
    }

    this._for = newValue;
    if (this._for) {
      this._for.addEventListener('keydown', this._onKeyDown);
    }
  }

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list-option:not([disabled])',
  })
  private readonly _options!: UUIComboboxListOptionElement[];

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list-option[active]',
  })
  private readonly _activeOptions!: UUIComboboxListOptionElement[];

  @state()
  private _value: FormDataEntryValue | FormData = '';

  @state()
  private _activeElementValue: string | null = null;

  private _selectedElement: UUIComboboxListOptionElement | undefined;

  @state()
  private _selectedValues: string[] = [];
  private _selectedElements: UUIComboboxListOptionElement[] = [];
  /**
   * Array of selected option values. Only relevant when multiple is true.
   * @type {string[]}
   */
  public get selectedValues(): string[] {
    return this._selectedValues;
  }

  /**
   * Array of display values for selected options. Only relevant when multiple is true.
   * @type {string[]}
   */
  public get selectedDisplayValues(): string[] {
    return this._selectedElements.map(el => el.displayValue || el.value || '');
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._for ??= this;

    this.addEventListener(UUISelectableEvent.SELECTED, this._onSelected);
    this.addEventListener(UUISelectableEvent.DESELECTED, this._onDeselected);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeyDown);

    this.removeEventListener(UUISelectableEvent.SELECTED, this._onSelected);
    this.removeEventListener(UUISelectableEvent.DESELECTED, this._onDeselected);
  }

  private _updateSelection() {
    if (this.multiple) {
      for (const option of this._options) {
        if (this._selectedValues.includes(option.value)) {
          option.selected = true;
          option.deselectable = true;
        }
      }
      this._selectedElements = this._options.filter(opt =>
        this._selectedValues.includes(opt.value),
      );
    } else {
      this.displayValue = '';
      for (const option of this._options) {
        if (option.value === this._value) {
          this.displayValue = option.displayValue || '';
          option.selected = true;
        } else {
          option.selected = false;
        }
      }
    }
  }

  private readonly _onSlotChange = () => {
    // Get index from first active, remove active from the rest.
    this.#updateActiveElement();

    for (const option of this._options) {
      option.multiple = this.multiple;
    }

    this._updateSelection();
    this.dispatchEvent(
      new UUIComboboxListEvent(UUIComboboxListEvent.INNER_SLOT_CHANGE),
    );
  };

  #updateActiveElement() {
    for (const option of this._activeOptions) {
      option.active = false;
    }

    const activeElement = this._getActiveElement;
    if (activeElement) {
      activeElement.active = true;
    } else {
      this._goToIndex(0);
    }
  }

  private readonly _onSelected = (e: Event) => {
    const option = e.composedPath()[0] as UUIComboboxListOptionElement;

    if (this.multiple) {
      // Allow this option to be toggled off on next click
      option.deselectable = true;
      // Add to array
      this._selectedElements.push(option);
      this._selectedValues = [...this._selectedValues, option.value || ''];
    } else {
      // Existing single-select logic
      if (this._selectedElement) {
        this._selectedElement.selected = false;
        this._selectedElement.active = false;
        this._selectedElement = undefined;
      }
      this._selectedElement = option;
      this.value = option.value || '';
      this.displayValue = option.displayValue || '';
    }

    this.dispatchEvent(new UUIComboboxListEvent(UUIComboboxListEvent.CHANGE));
  };

  private readonly _onDeselected = (e: Event) => {
    const el = e.composedPath()[0] as UUIComboboxListOptionElement;
    if (this.multiple) {
      // Remove from arrays
      this._selectedElements = this._selectedElements.filter(opt => opt !== el);
      this._selectedValues = this._selectedValues.filter(
        v => v !== (el.value || ''),
      );
    } else {
      // Existing single-select logic
      if (this._selectedElement === el) {
        this.value = '';
        this.displayValue = '';
      }
    }

    this.dispatchEvent(new UUIComboboxListEvent(UUIComboboxListEvent.CHANGE));
  };

  public resetSelection() {
    this._selectedValues = [];
    this._selectedElements = [];
  }

  private get _getActiveIndex(): number {
    if (this._activeElementValue === null) return -1;

    return this._options.findIndex(
      element => element.value === this._activeElementValue,
    );
  }

  private get _getActiveElement() {
    if (this._activeElementValue === null) return null;

    return this._options.find(
      element => element.value === this._activeElementValue,
    );
  }

  private readonly _moveIndex = (distance: number) => {
    const newIndex = Math.min(
      Math.max(this._getActiveIndex + distance, 0),
      this._options.length - 1,
    );

    this._goToIndex(newIndex);
  };

  private _goToIndex(index: number) {
    if (this._options.length === 0) return;

    index = Math.min(Math.max(index, 0), this._options.length - 1); // Makes sure the index stays within array length
    const activeElement = this._options[index];
    this._activeElementValue = activeElement.value;
    this.#updateActiveElement();

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  private readonly _onKeyDown = (e: KeyboardEvent) => {
    if (this._options.length <= 0) return;

    switch (e.code) {
      case 'ArrowUp':
        e.preventDefault();
        if (e.ctrlKey) {
          this._moveIndex(-10);
        } else {
          this._moveIndex(-1);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (e.ctrlKey) {
          this._moveIndex(10);
        } else {
          this._moveIndex(1);
        }

        break;

      case 'Home': {
        e.preventDefault();
        this._goToIndex(0);
        break;
      }

      case 'Enter': {
        e.preventDefault();
        this._getActiveElement?.click();
        break;
      }

      //Space key
      case 'Space': {
        e.preventDefault();
        e.stopPropagation();
        this._getActiveElement?.click();
        break;
      }

      case 'End': {
        e.preventDefault();
        this._goToIndex(this._options.length - 1);
        break;
      }

      default:
        break;
    }
  };

  render() {
    return html` <slot @slotchange=${this._onSlotChange}></slot> `;
  }

  static override readonly styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
    `,
  ];
}
