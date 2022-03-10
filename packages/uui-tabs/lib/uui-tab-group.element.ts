import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAssignedElements } from 'lit/decorators.js';

import { UUITabElement } from './uui-tab.element';

/**
 *  @element uui-tab-group
 */
@defineElement('uui-tab-group')
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

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-tab, .uui-tab, [role=tab]',
  })
  private slotNodes?: HTMLElement[];

  private tabElements: UUITabElement[] = [];

  private setTabArray() {
    if (this.slotNodes) {
      this.tabElements = this.slotNodes.filter(this.elementIsTab);
    } else {
      this.tabElements = [];
    }
  }

  private elementIsTab(el: unknown): el is UUITabElement {
    return el instanceof UUITabElement;
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
    const selectedElement = e.target as UUITabElement;
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
