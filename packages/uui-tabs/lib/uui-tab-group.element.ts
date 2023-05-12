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
  private _slottedNodes?: HTMLElement[];
  private _tabElements: HTMLElement[] = [];

  private _setTabArray() {
    this._tabElements = this._slottedNodes ? this._slottedNodes : [];
  }

  private _onSlotChange() {
    this._tabElements.forEach(el => {
      el.removeEventListener('click', this._onTabClicked);
    });

    this._setTabArray();

    this._tabElements.forEach(el => {
      el.addEventListener('click', this._onTabClicked);
    });
  }

  private _onTabClicked = (e: MouseEvent) => {
    const selectedElement = e.currentTarget as HTMLElement;
    if (this._elementIsTabLike(selectedElement)) {
      selectedElement.active = true;

      const filtered = this._tabElements.filter(el => el !== selectedElement);

      filtered.forEach(el => {
        if (this._elementIsTabLike(el)) {
          el.active = false;
        }
      });
    }
  };

  private _elementIsTabLike(el: any): el is UUITabElement {
    return el instanceof UUITabElement || 'active' in el;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tablist');
  }

  render() {
    return html` <slot @slotchange=${this._onSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
