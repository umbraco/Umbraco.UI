import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { UUIComboboxListEvent } from './UUIComboboxListEvent';
import { UUIComboboxListOptionElement } from './uui-combobox-list-option.element';
import { UUISelectableEvent } from '@umbraco-ui/uui-base/lib/events';

/**
 * @element uui-combobox-list
 * @fires {UUIComboboxListEvent} change - fires when selection is changed
 * @slot default - for uui-combobox-list-options
 * @description - A list that uses uui-combobox-list-options and handles keyboard navigation and selection.
 */
@defineElement('uui-combobox-list')
export class UUIComboboxListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
    `,
  ];

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
    if (this.value === newValue) return;

    const oldValue = this._value;
    this._value = newValue;
    this.displayValue =
      this._options.find(x => x.value === this._value)?.displayValue || '';

    this.updateOptionsState();
    this.dispatchEvent(new UUIComboboxListEvent(UUIComboboxListEvent.CHANGE));
    this.requestUpdate('value', oldValue);
  }

  /**
   * A readable value to display to show the selected value.
   * @type { string }
   * @attr
   * @default ""
   */
  @property({ type: String })
  public displayValue = '';

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list-option:not([disabled])',
  })
  private _options!: UUIComboboxListOptionElement[];

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-combobox-list-option[active]',
  })
  private _activeOptions!: UUIComboboxListOptionElement[];

  @state()
  private _value = '';

  private _index = 0;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeyDown);
    this.addEventListener(UUISelectableEvent.SELECTED, this._onOptionSelected);
    this.addEventListener(
      UUISelectableEvent.UNSELECTED,
      this._onOptionUnselected
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener(
      UUISelectableEvent.SELECTED,
      this._onOptionSelected
    );
    this.removeEventListener(
      UUISelectableEvent.UNSELECTED,
      this._onOptionUnselected
    );
  }

  protected firstUpdated() {
    if (this.value) {
      // Make sure the displayValue is set if we have a default value.
      this.displayValue =
        this._options.find(x => x.value === this._value)?.displayValue || '';
      this.dispatchEvent(new UUIComboboxListEvent(UUIComboboxListEvent.CHANGE));
    }
  }

  private _onOptionSelected = (e: any) => {
    const option = e.composedPath()[0];
    this.selectOption(option);
  };

  private _onOptionUnselected = () => {
    this.deselectOption();
  };

  private selectOption(option: UUIComboboxListOptionElement) {
    this._index = Math.max(this._options.indexOf(option), 0);
    this.value = option.value;
  }

  private deselectOption() {
    this.value = '';
  }

  private updateOptionsState = () => {
    for (const option of this._options) {
      option.selected = option.value === this._value;
    }
    for (const option of this._activeOptions) {
      option.active = this._options[this._index] === option;
    }
  };

  private _onSlotChange = () => {
    this._goToIndex(0); // Makes sure the index stays within array length if an option is removed
    this.updateOptionsState();
  };

  private _moveIndex = (distance: number) => {
    const newIndex = Math.min(
      Math.max(this._index + distance, 0),
      this._options.length - 1
    );

    this._goToIndex(newIndex);
  };

  private _goToIndex(index: number) {
    index = Math.min(Math.max(index, 0), this._options.length - 1); // Makes sure the index stays within array length

    if (this._options[this._index]) {
      this._options[this._index].active = false;
    }
    this._index = index;
    if (this._options[this._index]) {
      this._options[this._index].active = true;
      this._options[this._index].scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  private _selectAtIndex(index: number) {
    const newSelected = this._options[index];

    newSelected.selected
      ? this.deselectOption()
      : this.selectOption(newSelected);
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    if (this._options.length <= 0) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        e.ctrlKey ? this._moveIndex(-10) : this._moveIndex(-1);
        break;

      case 'ArrowDown':
        e.preventDefault();
        e.ctrlKey ? this._moveIndex(10) : this._moveIndex(1);

        break;

      case 'Home': {
        e.preventDefault();
        this._goToIndex(0);
        break;
      }

      case 'Enter': {
        e.preventDefault();
        this._selectAtIndex(this._index);
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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-combobox-list': UUIComboboxListElement;
  }
}
