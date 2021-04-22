import { LitElement, html, css, property, query } from 'lit-element';
import { UUIEvent } from '../../../event/UUIEvent';
import { UUIListItemClickEvent } from '../../../event/UUIListItemClickEvent';
import { UUIListItemFocusEvent } from '../../../event/UUIListItemFocusEvent';
import { UUIMenuItemElement } from '../uui-menu-item/uui-menu-item.element';

/**
 *  @element uui-list
 *  @slot  for list items
 *
 */

// TODO
// keyboard [v]
// multiple [x]
// dispatch event with selected elements indexes values?
// maybe add subheader element and divider?
// two line list items?
export class UUIMenuListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: Lato, Helvetica Neue, Helvetica, Arial, sans-serif;
      }

      :host([non-interactive]) ::slotted(*) {
        pointer-events: none;
      }
    `,
  ];

  @query('slot') protected slotElement!: HTMLSlotElement;

  //returns an Array of ListElements if they're in the slot or empty array
  protected get listElements(): UUIMenuItemElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(
            el => el instanceof UUIMenuItemElement
          ) as UUIMenuItemElement[])
      : [];
  }

  @property({ type: Boolean, reflect: true, attribute: 'non-interactive' })
  nonInteractive = false;

  //those listeners should be attached on constructor
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('list-item-select', this._handleSelect);
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('focus', this._findFocusedElement);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('list-itemselect', this._handleSelect);
    this.removeEventListener('keydown', this._onKeyDown);

    this.removeEventListener('focus', this._findFocusedElement);
  }

  private _focusedElementIndex = -1;

  private _lastSelectedIndex: number | null = null;

  private _findFocusedElement(e: Event) {
    this._focusedElementIndex = this.listElements.findIndex(
      el => el === e.target
    );
  }
  // TODO make this pretty!
  private _handleSelect(e: Event) {
    if (this.nonInteractive) return;

    const listElements = this.listElements;
    let selectedElement: UUIMenuItemElement;

    listElements.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
        this._lastSelectedIndex = listElements.indexOf(el);
      }
    });

    const filtered = listElements.filter(el => el !== selectedElement);

    //change this to a method specific to parcitular elemnent
    filtered.forEach(el => {
      el.removeAttribute('selected');
    });
  }

  private _focusPrevious() {
    if (this._focusedElementIndex !== null && this._focusedElementIndex > 0) {
      this.listElements[this._focusedElementIndex - 1].setAttribute(
        'focused',
        'true'
      );
    }
  }

  private _focusNext() {
    if (
      this._focusedElementIndex !== null &&
      this._focusedElementIndex + 1 < this.listElements.length
    ) {
      this.listElements[this._focusedElementIndex + 1].setAttribute(
        'focused',
        'true'
      );
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowUp': {
        this._focusPrevious();
        break;
      }
      case 'ArrowDown': {
        this._focusNext();
        break;
      }
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}

//can someone explain to me why this works?
// declare global {
//   interface GlobalEventHandlersEventMap {
//     'list-item-select': CustomEvent<UUIListItemClickEvent>;
//   }
// }
