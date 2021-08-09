import { LitElement, html, css } from 'lit';
import { UUITabElement } from '../uui-tab/uui-tab.element';

/**
 *  @element uui-tab-group
 */
export class UUITabGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-interface-border);
      }
    `,
  ];

  private tabElements: UUITabElement[] = [];

  private onSlotChange(e: any) {
    if (this.tabElements) {
      this.tabElements.forEach(el => {
        el.removeEventListener(
          'click',
          this.onTabActive as EventHandlerNonNull
        );
      });
    }
    this.tabElements = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(el => el instanceof UUITabElement) as UUITabElement[];

    this.tabElements.forEach(el => {
      el.addEventListener('click', this.onTabActive as EventHandlerNonNull);
    });
  }

  private onTabActive = (e: MouseEvent) => {
    const selectedElement: UUITabElement = e.target as UUITabElement;
    selectedElement.active = true;

    const filtered = this.tabElements.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.active = false;
    });
  };

  render() {
    return html` <slot @slotchange=${this.onSlotChange}></slot> `;
  }
}
