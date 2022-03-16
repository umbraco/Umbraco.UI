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
    `,
  ];

  @property({ type: Boolean })
  public multiselect = false;

  @state()
  private _selected: UUISelectOptionElement[] = [];

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-select-option:not([disabled])',
  })
  private _options!: UUISelectOptionElement[]; //TODO: Fix the !

  private _index = 0;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeyDown);
    this.addEventListener(
      UUISelectListEvent.OPTION_CLICK,
      this._onOptionClicked
    );

    this.addEventListener(UUISelectListEvent.OPTION_HOVER, this._onOptionHover);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener(
      UUISelectListEvent.OPTION_CLICK,
      this._onOptionClicked
    );

    this.addEventListener(UUISelectListEvent.OPTION_HOVER, this._onOptionHover);
  }

  private _onOptionHover = (e: any) => {
    const index = this._options.indexOf(e.target);
    if (index >= 0) {
      this._goToIndex(index);
    }
  };

  private _onOptionClicked = (e: any) => {
    const index = this._options.indexOf(e.target);
    if (index >= 0) {
      this._selectAtIndex(index);
    }
  };

  private _onSlotChange = () => {
    this._goToIndex(this._index); // Makes sure the index stays within array length if an option is removed
  };

  private _moveIndex = (distance: number) => {
    const newIndex = Math.min(
      Math.max(this._index + distance, 0),
      this._options.length - 1
    );

    // const newIndex =
    //   direction > 0
    //     ? this._getNextAvailableIndex(this._index)
    //     : this._getPreviousAvailableIndex(this._index);

    this._goToIndex(newIndex);
  };

  // private _getNextAvailableIndex(startPosition: number): number {
  //   const newStart = startPosition + 1;
  //   const index = this._options
  //     .slice(newStart)
  //     .findIndex(option => option.disabled === false);
  //   return index === -1 ? startPosition : newStart + index;
  // }

  // private _getPreviousAvailableIndex(startPosition: number): number {
  //   const newStart = startPosition - 1;

  //   const index = this._options
  //     .slice(0, newStart + 1)
  //     .reverse()
  //     .findIndex(option => option.disabled === false);
  //   return index === -1 ? startPosition : newStart - index;
  // }

  private _goToIndex(index: number) {
    index = Math.min(Math.max(index, 0), this._options.length - 1); // Makes sure the index stays within array length

    this._options[this._index].active = false;
    this._index = index;
    this._options[this._index].active = true;

    this._options[this._index].scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  private _selectAtIndex(index: number) {
    const newSelected = this._options[index];

    if (newSelected.disabled) return; // We shouldn't be able to select disabled options

    const selectedIndex = this._selected.indexOf(newSelected);

    if (selectedIndex < 0) {
      // If option is already selected then deselect it
      if (this.multiselect) {
        this._selected.push(newSelected);
      } else {
        this._selected[0].selected = false;
        this._selected = [newSelected];
      }
      newSelected.selected = true;
    } else {
      // If is not already selected then select it
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
    console.log(this._options);

    return html` <slot @slotchange=${this._onSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-list': UUISelectListElement;
  }
}
