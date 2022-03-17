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
  // private _selected: UUISelectOptionElement[] = [];
  @state()
  private _value: any[] = [];

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
    console.log('Slot updated');

    this._goToIndex(0); // Makes sure the index stays within array length if an option is removed
    this._updateOptions();
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

  private _updateOptions = () => {
    for (const option of this._options) {
      option.selected = this._value.includes(option.value);
    }
  };

  private _selectAtIndex(index: number) {
    const newSelected = this._options[index];

    const selectedIndex = this._value.indexOf(newSelected.value);

    if (selectedIndex < 0) {
      //TODO: Add multiselect
      this._value = [newSelected.value];
    } else {
      this._value.splice(selectedIndex, 1);
    }

    this._updateOptions();

    this.dispatchEvent(
      new UUISelectListEvent(UUISelectListEvent.CHANGE, {
        detail: { selected: this._value },
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
    return html` <slot @slotchange=${this._onSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-list': UUISelectListElement;
  }
}
