//TODO
//keyboard
//multiple
//dispatch event with selected elements indexes values?
//maybe add subheader element and divider?
//two line list items?

import { LitElement, html, css, property, query } from 'lit-element';
import { UUIListItemClickEvent } from '../../../event/UUIListItemClickEvent';
import { UUIListItemFocusEvent } from '../../../event/UUIListItemFocusEvent';
import { UUIListItemElement } from '../uui-list-item/uui-list-item.element';

/**
 *  @element uui-list
 *  @slot  for list items
 *
 */

export class UUIListElement extends LitElement {
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

  protected get listElements(): UUIListItemElement[] {
    const slot = this.slotElement;

    if (slot) {
      return slot
        .assignedElements({ flatten: true })
        .filter(el => el instanceof UUIListItemElement) as UUIListItemElement[];
    }

    return [];
  }

  @property({ type: Boolean, reflect: true, attribute: 'non-interactive' })
  nonInteractive = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      'list-item-select',
      this._handleSelect as EventListener
    );
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('focus', this._findFocusedElement as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      'list-itemselect',
      this._handleSelect as EventListener
    );
    this.removeEventListener('keydown', this._onKeyDown as EventListener);

    this.removeEventListener(
      'focus',
      this._findFocusedElement as EventListener
    );
  }

  private _focusedElementIndex: number | null = null;

  private _findFocusedElement(e: UUIListItemFocusEvent) {
    this._focusedElementIndex = this.listElements.findIndex(
      el => el === e.target
    );
  }
  //make this better when element is foicused but other element is selected
  private _handleSelect(e: UUIListItemClickEvent) {
    if (this.nonInteractive) return;

    const listElements = this.listElements;
    let selectedElement: UUIListItemElement;
    let selectedIndex: number | null;

    listElements.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
        selectedIndex = listElements.indexOf(el);
      }
    });

    listElements
      .filter(el => el !== selectedElement)
      .forEach(el => {
        if (el.selected) el.removeAttribute('selected');
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
    )
      this.listElements[this._focusedElementIndex + 1].setAttribute(
        'focused',
        'true'
      );
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
