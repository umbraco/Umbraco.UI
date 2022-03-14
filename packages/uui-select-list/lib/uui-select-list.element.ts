import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { UUISelectListEvent } from './UUISelectListEvent';

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
        border: 5px solid;
        box-sizing: border-box;
      }

      ::slotted(*) {
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid transparent;
      }
      ::slotted(.active) {
        border-color: black;
      }

      ::slotted(.selected) {
        background-color: #b4d3e7;
        font-weight: bold;
      }
    `,
  ];

  @property({ type: Boolean })
  multiple = false;

  @state()
  private _selected: Element[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeyDown);
  }

  private _onSlotChange = () => {
    this._options = this.shadowRoot!.querySelector('slot')!.assignedElements();
    this._options[this._index]?.classList.add('active');
  };

  private _moveIndex = (index: number) => {
    const newIndex = Math.min(
      Math.max(this._index + index, 0),
      this._options.length - 1
    );

    this._goToIndex(newIndex);
  };

  private _goToIndex(index: number) {
    this._options[this._index]?.classList.remove('active');
    this._index = index;
    this._options[this._index]?.classList.add('active');
  }

  // TODO: When we emit the change event spread the array ...
  private _selectAtIndex(index: number) {
    const newSelected = this._options[index];
    const selectedIndex = this._selected.indexOf(newSelected);

    if (selectedIndex < 0) {
      if (this.multiple) {
        this._selected.push(newSelected);
      } else {
        this._selected[0]?.classList.remove('selected');
        this._selected = [newSelected];
      }
      newSelected.classList.add('selected');
    } else {
      this._options[index].classList.remove('selected');
      this._selected.splice(selectedIndex, 1);
    }

    this.dispatchEvent(
      new UUISelectListEvent(UUISelectListEvent.CHANGE, {
        detail: { selected: this._selected },
      })
    );
  }

  // // TODO: Fix
  // private _deselectAtIndex(index: number) {
  //   // this._options[index].classList.remove('selected');
  //   // this._selectedOption = undefined;
  // }

  private _onKeyDown = (e: KeyboardEvent) => {
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

  private _index = 0;

  private _options: Element[] = [];

  render() {
    return html` <slot @slotchange=${this._onSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-list': UUISelectListElement;
  }
}
