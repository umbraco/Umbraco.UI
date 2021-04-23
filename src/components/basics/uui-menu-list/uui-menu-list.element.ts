import { LitElement, html, css, property, query } from 'lit-element';
import { UUIMenuItemElement } from '../uui-menu-item/uui-menu-item.element';

/**
 *  @element uui-list
 *  @slot  for list items
 *
 */

export class UUIMenuListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: inherit;
      }

      :host([non-interactive]) ::slotted(*) {
        pointer-events: none;
      }
    `,
  ];

  @query('slot') protected slotElement!: HTMLSlotElement;

  protected listElements: UUIMenuItemElement[] = [];

  protected getListElements(): UUIMenuItemElement[] {
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

  private _handleSlotChange() {
    this.listElements = this.getListElements();
    console.log(this.listElements);
  }

  constructor() {
    super();
    this.addEventListener('click', this._handleSelect);
  }

  private _handleSelect(e: MouseEvent) {
    if (this.nonInteractive) return;

    let selectedElement: UUIMenuItemElement;

    this.listElements.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
      }
    });

    const filtered = this.listElements.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.active = false;
    });
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }
}
