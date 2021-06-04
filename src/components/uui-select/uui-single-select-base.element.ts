import { LitElement } from 'lit';
import { state, property, query } from 'lit/decorators';
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
  @query('uui-overflow-container')
  overflow!: UUIOverflowContainer;

  @query('slot') protected slotElement!: HTMLSlotElement;
  protected listElements!: UUISelectOptionElement[];

  //returns an Array of ListElements if they're in the slot or empty array
  protected getListElements(): UUISelectOptionElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(
            el => el instanceof UUISelectOptionElement
          ) as UUISelectOptionElement[])
      : [];
  }

  protected onSlotChange() {
    if (this.listElements) {
      this.listElements.forEach(el => {
        el.removeEventListener(
          'change',
          this.onListElementChange as EventListener
        );
      });
    }
    this.listElements =
      (this.slotElement
        .assignedElements({ flatten: true })
        .filter(
          el => el instanceof UUISelectOptionElement
        ) as UUISelectOptionElement[]) || [];
    this.updateSelectedElement();
    this.listElements.forEach(el => {
      el.addEventListener('change', this.onListElementChange as EventListener);
    });
  }

  private _value = '';
  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldVal = this._value;
    this._value = newValue;
    this.updateSelectedElement();
    this.deselectChildren();
    this.requestUpdate('value', oldVal);
  }

  @state()
  protected selectedElement: UUISelectOptionElement | null = null;
  protected updateSelectedElement() {
    this.selectedElement =
      this.listElements?.find(el => el.value === this._value) || null;
  }

  private deselectChildren() {
    if (this.listElements) {
      const notValue = this.listElements.filter(el => el.value !== this._value);
      notValue.forEach(el => el.deselect());
    }
  }

  protected onListElementChange = (e: UUISelectOptionEvent) => {
    if (e.target.selected === true) {
      this.value = e.target.value;
      this._fireChangeEvent();
    }
  };

  private _fireChangeEvent() {
    this.dispatchEvent(new UUISelectEvent(UUISelectEvent.CHANGE));
  }

  protected selectIndex(index: number) {
    if (this.listElements && index < this.listElements.length) {
      this.select(this.listElements[index]);
      this._fireChangeEvent();
    }
  }
  protected select(newSelection: UUISelectOptionElement) {
    newSelection.select();
    this.value = newSelection.value;
  }
  protected selectPreviousElement() {
    this.moveSelection(-1);
  }
  protected selectNextElement() {
    this.moveSelection(1);
  }
  private moveSelection(move: number) {
    let newSelection: UUISelectOptionElement | null = null;
    if (this.listElements && this.listElements.length > 0) {
      if (this.selectedElement) {
        const index: number = this.listElements.indexOf(this.selectedElement);
        if (index !== -1) {
          newSelection = this.getNextEnabledElement(index, index, move);
        }
      } else {
        newSelection = this.listElements[
          move > 0 ? 0 : this.listElements.length - 1
        ];
      }
      if (newSelection) {
        this.select(newSelection);
      }
    }
  }
  private getNextEnabledElement(
    originalIndex: number,
    index: number,
    move: number
  ): UUISelectOptionElement | null {
    let nextIndex = (index + move) % this.listElements.length;
    if (nextIndex < 0) {
      nextIndex += this.listElements.length;
    }
    if (originalIndex === nextIndex) {
      return null;
    }
    if (this.listElements[nextIndex].disabled !== true) {
      return this.listElements[nextIndex];
    }
    return this.getNextEnabledElement(originalIndex, nextIndex, move);
  }
}
