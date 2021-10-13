import { LitElement, html, css } from 'lit';
import { UUITabElement } from './uui-tab.element';
import { queryAssignedNodes } from 'lit/decorators.js';

/**
 *  @element uui-tab-group
 */
export class UUITabGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        color: var(--uui-tab-text);
        background: var(--uui-tab-background, none);
        height: 100%;
        min-height: 48px;
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-tab-divider, none);
      }
    `,
  ];

  @queryAssignedNodes(undefined, true, 'uui-tab')
  private slotNodes?: UUITabElement[];

  private tabElements: UUITabElement[] = [];

  private setTabArray() {
    this.tabElements = this.slotNodes ? this.slotNodes : [];
  }

  private onSlotChange() {
    this.setTabArray();
    if (this.tabElements) {
      this.tabElements.forEach(el => {
        el.removeEventListener(
          'click',
          // @ts-ignore TODO: fix typescript error
          this.onTabActive as EventHandlerNonNull
        );
      });
    }

    this.tabElements.forEach(el => {
      // @ts-ignore TODO: fix typescript error
      el.addEventListener('click', this.onTabActive as EventHandlerNonNull);
    });
  }

  private onTabActive = (e: MouseEvent) => {
    //? should this contain stopPropagation?
    const selectedElement: UUITabElement = e.target as UUITabElement;
    selectedElement.active = true;

    const filtered = this.tabElements.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.active = false;
    });
  };

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tablist');
  }

  render() {
    return html` <slot @slotchange=${this.onSlotChange}></slot> `;
  }
}
