import { LitElement, html, css, property, query } from 'lit-element';
import { UUIListItemClickEvent } from '../../../event/UUIListItemClickEvent';

/**
 *  @element uui-list
 *  @slot  for list items
 *
 */
interface ListElement extends Element {
  selected?: boolean;
}

export class UUIListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: Lato, Helvetica Neue, Helvetica, Arial, sans-serif;
      }
    `,
  ];

  @query('slot') protected slotElement!: HTMLSlotElement | null;

  protected get listElements(): ListElement[] {
    const slot = this.slotElement;

    if (slot) {
      return slot
        .assignedElements({ flatten: true })
        .filter(el => el.nodeType === 1);
    }

    return [];
  }

  // this listener may go on ul, this is jusst an example of how to wriote that when TS shouts on you
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      'list-item-select',
      this._handleSelect as EventListener
    ); //works like that
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      'list-itemselect',
      this._handleSelect as EventListener
    );
  }

  private _handleSelect(e: UUIListItemClickEvent) {
    console.log(e.target);
    const listElements: ListElement[] = this.listElements;
    let selectedElement: ListElement;
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

  render() {
    return html`
      <ul>
        <slot></slot>
      </ul>
    `;
  }
}
