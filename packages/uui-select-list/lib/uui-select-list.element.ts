import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { UUISelectListEvent } from './UUISelectListEvent';
import { UUISelectOptionElement } from './uui-select-option.element';

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

      /* ::slotted(.active) {
        border-color: black;
        background-color: #d5e6f1;
      }

      ::slotted(.selected) {
        background-color: #7ec0ec;
        font-weight: bold;
      } */
    `,
  ];

  @property({ type: Boolean })
  multiple = false;

  @state()
  private _selected: UUISelectOptionElement[] = [];

  @queryAssignedElements({ flatten: true, selector: 'uui-select-option' })
  private _options!: UUISelectOptionElement[]; //TODO: Fix the !

  private _index = 0;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeyDown);
    this.addEventListener(
      UUISelectListEvent.OPTION_CLICK,
      this._onOptionClicked
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeyDown);
  }

  private _onOptionClicked = (e: any) => {
    const index = this._options.indexOf(e.target);
    if (index >= 0) {
      this._selectAtIndex(index);
    }
  };

  private _onSlotChange = () => {
    //TODO This should change the active property on select-option instead.
    this._goToIndex(this._index); //Makes sure the index stays within array length if an option is removed
    this._options[this._index].active = true;
  };

  private _moveIndex = (index: number) => {
    const newIndex = Math.min(
      Math.max(this._index + index, 0),
      this._options.length - 1
    );

    this._goToIndex(newIndex);
  };

  private _goToIndex(index: number) {
    index = Math.min(Math.max(index, 0), this._options.length - 1); //Makes sure the index stays within array length

    this._options[this._index].active = false;
    this._index = index;
    this._options[this._index].active = true;
  }

  // TODO: When we emit the change event spread the array ...
  private _selectAtIndex(index: number) {
    const newSelected = this._options[index];
    const selectedIndex = this._selected.indexOf(newSelected);

    if (selectedIndex < 0) {
      if (this.multiple) {
        this._selected.push(newSelected);
      } else {
        //TODO This should change the selected property on select-option instead.
        this._selected[0].selected = false;
        this._selected = [newSelected];
      }
      newSelected.selected = true;
    } else {
      this._options[index].selected = false;
      this._selected.splice(selectedIndex, 1);
    }

    this.dispatchEvent(
      new UUISelectListEvent(UUISelectListEvent.CHANGE, {
        detail: { selected: this._selected.map(option => option.value) },
      })
    );
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    if (this._options.length <= 0) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this._moveIndex(-1);
        break;

      case 'ArrowDown':
        e.preventDefault();
        this._moveIndex(1);
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
