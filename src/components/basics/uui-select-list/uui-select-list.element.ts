import { LitElement, html, css, property, query } from 'lit-element';
import { UUISelectListItemElement } from '../uui-select-list-item/uui-select-list-item.element';
import { UUISelectListItemEvent } from '../uui-select-list-item/UUISelectListItemEvent';
import { UUISelectListEvent } from './UUISelectListEvent';
/**
 *  @element uui-list
 *  @slot  for list items
 *
 */

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const SPACE = ' ';
const ENTER = 'Enter';
const ESCAPE = 'Escape';

// TODO reneame this top uui-select-list, add roles
// keyboard [v]
// multiple [x]
// dispatch event with selected elements indexes values?
// maybe add subheader element and divider?
// two line list items?
export class UUISelectListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  @query('slot') protected slotElement!: HTMLSlotElement;

  private listElements!: UUISelectListItemElement[];

  //returns an Array of ListElements if they're in the slot or empty array
  private getlistElements(): UUISelectListItemElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(
            el => el instanceof UUISelectListItemElement
          ) as UUISelectListItemElement[])
      : [];
  }

  firstUpdated() {
    this.listElements = this.getlistElements();
    if (this.listElements.length > 0)
      this.listElements[0].setAttribute('tabindex', '0');
  }

  constructor() {
    super();
    //this.addEventListener('change', this._handleSelectOnClick as EventListener);
    this.addEventListener('keydown', this._onKeydown);
  }

  private _value: FormDataEntryValue = '';
  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldVal = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldVal);
    //this.dispatchEvent(new UUISelectListEvent(UUISelectListEvent.CHANGE));
  }

  private _selected: number | null = null;
  @property({ type: Number, reflect: true })
  get selected() {
    return this._selected;
  }

  set selected(newVal) {
    const oldVal = this._selected;
    this._selected = newVal;
    this._setSelected(newVal);
    // this.value = newVal ? this.listElements[newVal].value : '';
    this.requestUpdate('selected', oldVal);
  }

  private _setSelected(newVal: number | null) {
    this._selected = newVal;

    this._lastSelectedIndex = this.enabledElementsIndexes.findIndex(
      index => index === this._selected
    );
    if (newVal === null) {
      this.listElements[0].setAttribute('tabindex', '0');
    }
    const notSelected = this.listElements.filter(
      el => this.listElements.indexOf(el) !== this._selected
    );
    notSelected.forEach(el => el.deselect());
    this.value = newVal !== null ? this.listElements[newVal].value : '';
  }

  private _handleSelectOnClick(e: UUISelectListItemEvent) {
    e.stopPropagation();
    this._setSelected(this.listElements.indexOf(e.target));
    this._fireChangeEvent();
  }

  private _fireChangeEvent() {
    this.dispatchEvent(new UUISelectListEvent(UUISelectListEvent.CHANGE));
  }

  protected get enabledElementsIndexes() {
    const indexes: number[] = [];
    this.listElements.forEach(el => {
      if (el.disabled === false) indexes.push(this.listElements.indexOf(el));
    });
    return indexes;
  }

  private _lastSelectedIndex = 0; //this is index in the array of enalbled radios indexes (this.enabledElementsIndexes)
  private _selectPreviousElement() {
    if (
      this.selected === null ||
      this.selected === this.enabledElementsIndexes[0]
    ) {
      this.selected = this.enabledElementsIndexes[
        this.enabledElementsIndexes.length - 1
      ];
      this._lastSelectedIndex = this.enabledElementsIndexes.length - 1;
      if (this.selected !== null) this.listElements[this.selected].select();
    } else {
      this._lastSelectedIndex--;
      this.selected = this.enabledElementsIndexes[this._lastSelectedIndex];
      this.listElements[this.selected].select();
    }
    this._fireChangeEvent();
  }

  private _selectNextElement() {
    if (
      this.selected === null ||
      this.selected ===
        this.enabledElementsIndexes[this.enabledElementsIndexes.length - 1]
    ) {
      this.selected = this.enabledElementsIndexes[0];
      this._lastSelectedIndex = 0;
      if (this.selected !== null) this.listElements[this.selected].select();
    } else {
      this._lastSelectedIndex++;
      this.selected = this.enabledElementsIndexes[this._lastSelectedIndex];
      this.listElements[this.selected].select();
    }
    this._fireChangeEvent();
  }

  private _onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case ARROW_UP: {
        e.preventDefault();
        this._selectPreviousElement();
        break;
      }

      case ARROW_DOWN: {
        e.preventDefault();
        this._selectNextElement();
        break;
      }

      // case SPACE: {
      //   if (this.selected === null)
      //     this.selected = this.enabledElementsIndexes[0];
      // }
    }
  }

  render() {
    return html`
      <slot
        @slotchange=${() => {
          this.listElements = this.getlistElements();
        }}
        @change=${this._handleSelectOnClick}
      ></slot>
    `;
  }
}
