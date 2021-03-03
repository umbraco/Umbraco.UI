import { internalProperty, LitElement, property, query } from 'lit-element';
import { UUISelectOptionElement } from '../uui-select-option/uui-select-option.element';
import { UUISelectOptionEvent } from '../uui-select-option/UUISelectOptionEvent';
import { UUISelectEvent } from './UUISelectEvent';
import { UUIOverflowContainer } from '../uui-overflow-container/uui-overflow-container.element';

/**
 *  @element uui-list
 *  @slot  for list items
 *
 */

// TODO reneame this top uui-select-list, add roles
// keyboard [v]
// multiple [x]
// dispatch event with selected elements indexes values?
// maybe add subheader element and divider?
// two line list items?

//UUISelectSingleBase
export class UUISingleSelectBaseElement extends LitElement {
  @query('slot') protected slotElement!: HTMLSlotElement;

  protected listElements!: UUISelectOptionElement[];

  //returns an Array of ListElements if they're in the slot or empty array
  protected getlistElements(): UUISelectOptionElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(
            el => el instanceof UUISelectOptionElement
          ) as UUISelectOptionElement[])
      : [];
  }

  protected slottedChildren!: UUISelectOptionElement[];

  @query('uui-overflow-container')
  overflow!: UUIOverflowContainer;

  firstUpdated() {
    this.slottedChildren = this.getlistElements();

    this.slottedChildren.forEach(el => {
      this.overflow.appendChild(el);
    });
    const children = Array.from(
      this.overflow.childNodes
    ) as UUISelectOptionElement[];

    this.listElements = children.filter(
      el => el instanceof UUISelectOptionElement
    );
    console.log(this.listElements);
  }

  private _value = '';
  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldVal = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldVal);
  }

  private _selected: number | null = null;
  @property({ type: Number })
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

  @internalProperty()
  selectedID = '';

  private _setSelected(newVal: number | null) {
    this._selected = newVal;

    this._lastSelectedIndex = this.enabledElementsIndexes.findIndex(
      index => index === this._selected
    );
    if (newVal === null) {
      //this.selectedID = this.listElements[this.enabledElementsIndexes[0]].id;
      //this.listElements[0].setAttribute('tabindex', '0');
    }
    const notSelected = this.listElements.filter(
      el => this.listElements.indexOf(el) !== this._selected
    );
    notSelected.forEach(el => el.deselect());

    this.value = newVal !== null ? this.listElements[newVal].value : '';
    this.selectedID = newVal !== null ? this.listElements[newVal].id : '';
  }

  protected _handleSelectOnClick(e: UUISelectOptionEvent) {
    e.stopPropagation();
    this._setSelected(this.listElements.indexOf(e.target));
    this._fireChangeEvent();
  }

  private _fireChangeEvent() {
    this.dispatchEvent(new UUISelectEvent(UUISelectEvent.CHANGE));
  }

  protected get enabledElementsIndexes() {
    const indexes: number[] = [];
    this.listElements.forEach(el => {
      if (el.disabled === false) indexes.push(this.listElements.indexOf(el));
    });
    return indexes;
  }

  private _lastSelectedIndex = 0; //this is index in the array of enalbled radios indexes (this.enabledElementsIndexes)
  protected _selectPreviousElement() {
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

  protected _selectNextElement() {
    console.log(this.listElements);
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

  //   render() {
  //     return html`
  //       <slot
  //         @slotchange=${() => {
  //           this.listElements = this.getlistElements();
  //         }}
  //         @change=${this._handleSelectOnClick}
  //       ></slot>
  //     `;
  //   }
}
