import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { UUISelectListEvent } from './UUISelectListEvent';
import { UUISelectOptionElement } from './uui-select-option.element';
import { UUISelectableEvent } from 'packages/uui-base/lib/events';

/**
 * @element uui-select-list
 */
@defineElement('uui-select-list')
export class UUISelectListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
    `,
  ];

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-select-option:not([disabled])',
  })
  private _options!: UUISelectOptionElement[]; //TODO: Fix the !

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-select-option[selected]',
  })
  private _selectedOptions!: UUISelectOptionElement[]; //TODO: Fix the !

  @state()
  private _value: any;

  @property({ attribute: false })
  public get value() {
    return this._value;
  }
  public set value(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    this.updateOptionsState();
    this.requestUpdate('value', oldValue);
  }

  @property({ type: String })
  public displayValue = '';

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

  private _onOptionSelected = (e: any) => {
    const option = e.composedPath()[0];
    this.selectOption(option);
  };

  private _onOptionUnselected = () => {
    this.deselectOption();
  };

  private selectOption(option: UUISelectOptionElement) {
    this.value = option.value;
    this.displayValue =
      option.displayValue || option.textContent || this.value.toString();

    for (const option of this._selectedOptions) {
      option.selected = option.value === this.value;
    }
    this.dispatchEvent(new UUISelectListEvent(UUISelectListEvent.CHANGE));
  }

  private deselectOption() {
    this.value = undefined;
    this.displayValue = '';
    this.dispatchEvent(new UUISelectListEvent(UUISelectListEvent.CHANGE));
  }

  private updateOptionsState = () => {
    for (const option of this._options) {
      option.selected = option.value === this._value;
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
    'uui-select-list': UUISelectListElement;
  }
}
