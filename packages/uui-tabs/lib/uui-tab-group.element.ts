import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAssignedElements } from 'lit/decorators.js';

import { UUITabElement } from './uui-tab.element';

/**
 *  @element uui-tab-group
 *  @slot - Default slot for the tab group
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
    selector: 'uui-tab, [uui-tab], [role=tab]',
  })
  private slotNodes?: HTMLElement[];

  private tabElements: HTMLElement[] = [];

  private setTabArray() {
    this.tabElements = this.slotNodes ? this.slotNodes : [];
  }

  private onSlotChange() {
    this.tabElements.forEach(el => {
      el.removeEventListener('click', this.onTabActive);
    });

    this.setTabArray();

    this.tabElements.forEach(el => {
      el.addEventListener('click', this.onTabActive);
    });
  }

  private onTabActive = (e: MouseEvent) => {
    //? should this contain stopPropagation?
    const selectedElement = e.currentTarget as HTMLElement;
    if (this.elementIsTabLike(selectedElement)) {
      selectedElement.active = true;
    }

    const filtered = this.tabElements.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      if (this.elementIsTabLike(el)) {
        el.active = false;
      }
    });
  };

  private elementIsTabLike(el: any): el is UUITabElement {
    return el instanceof UUITabElement || 'active' in el;
  }

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
