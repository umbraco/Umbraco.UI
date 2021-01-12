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

  connectedCallback() {
    super.connectedCallback();
    // this.addEventListener('list-item-select', this._handleSelect);
  }

  private _handleSelect(e: UUIListItemClickEvent) {
    console.log(e.target);
  }

  updated() {
    console.log(this.listElements);
  }

  render() {
    return html`
      <ul @list-item-select="${this._handleSelect}">
        <slot></slot>
      </ul>
    `;
  }
}
