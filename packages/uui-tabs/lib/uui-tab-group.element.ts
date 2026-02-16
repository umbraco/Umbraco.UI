import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUIResponsiveContainerElement } from '@umbraco-ui/uui-responsive-container/lib';
import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import { css, html } from 'lit';
import { property, query } from 'lit/decorators.js';

import type { UUITabElement } from './uui-tab.element';

@defineElement('uui-tab-group')
export class UUITabGroupElement extends UUIResponsiveContainerElement {
  @query('#more-button')
  private _tabMoreButton!: UUIButtonElement;
  @property({
    type: String,
    reflect: true,
    attribute: 'dropdown-content-direction',
  })
  dropdownContentDirection: 'vertical' | 'horizontal' = 'vertical';

  protected override _filterChildren(): HTMLElement[] {
    return Array.from(this.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement &&
        (child.tagName.toLowerCase() === 'uui-tab' ||
          child.hasAttribute('uui-tab') ||
          child.getAttribute('role') === 'tab'),
    );
  }

  protected override _onChildSetup(child: HTMLElement): void {
    child.addEventListener('click', this.#onTabClicked);
  }

  protected override _cleanup(): void {
    this._childElements.forEach(el => {
      el.removeEventListener('click', this.#onTabClicked);
    });
    super._cleanup();
  }

  #onTabClicked = (e: MouseEvent) => {
    const selectedElement = e.currentTarget as HTMLElement;

    if (this.#isElementTabLike(selectedElement)) {
      selectedElement.active = true;

      this._childElements.forEach(el => {
        if (el !== selectedElement && this.#isElementTabLike(el)) {
          el.active = false;
        }
      });
      this.#updateActiveInsideState();
    }
  };

  #updateActiveInsideState() {
    // Check if any tab in the dropdown is active
    const hasActiveHidden = this._childElements
      .slice(this._visibleCount)
      .some(tab => this.#isElementTabLike(tab) && tab.active);

    if (hasActiveHidden) {
      this._tabMoreButton?.classList.add('active-inside');
    } else {
      this._tabMoreButton?.classList.remove('active-inside');
    }
  }

  #isElementTabLike(el: any): el is UUITabElement {
    return (
      typeof el === 'object' && 'active' in el && typeof el.active === 'boolean'
    );
  }

  render() {
    const visibleSlots = this._childElements
      .slice(0, this._visibleCount)
      .map((_, i) => html`<slot name="item-${i}"></slot>`);

    const dropdownSlots = this._childElements
      .slice(this._visibleCount)
      .map((_, i) => html`<slot name="item-${this._visibleCount + i}"></slot>`);

    const showMoreButton = dropdownSlots.length > 0;

    return html`
      <div id="main">
        <div id="grid" role="tablist">${visibleSlots}</div>
        <uui-button
          popovertarget="popover-container"
          style=${showMoreButton ? '' : 'display: none'}
          id="more-button"
          label="More"
          compact>
          <uui-symbol-more></uui-symbol-more>
        </uui-button>
      </div>
      <uui-popover-container
        id="popover-container"
        popover
        placement="bottom-end">
        <div id="hidden-tabs-container" role="tablist">${dropdownSlots}</div>
      </uui-popover-container>
    `;
  }

  static styles = [
    css`
      :host {
        --uui-responsive-container-gap: var(--uui-tab-group-gap, 0);
        min-width: 0;
        display: flex;
        height: 100%;
      }

      #main {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
      }

      #grid {
        width: 1fr;
        display: flex;
        height: 100%;
        min-height: 48px;
        overflow: hidden;
        text-wrap: nowrap;
        color: var(--uui-tab-text);
        gap: var(--uui-tab-group-gap, 0);
      }

      #popover-container {
        --uui-tab-text: var(--uui-tab-group-dropdown-tab-text, unset);
        --uui-tab-text-hover: var(
          --uui-tab-group-dropdown-tab-text-hover,
          unset
        );
        --uui-tab-text-active: var(
          --uui-tab-group-dropdown-tab-text-active,
          unset
        );
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-tab-divider, none);
      }

      #hidden-tabs-container ::slotted(*) {
        width: 100%;
      }

      #hidden-tabs-container {
        width: fit-content;
        display: flex;
        flex-direction: column;
        background-color: var(
          --uui-tab-group-dropdown-background,
          var(--uui-color-surface)
        );
        border-radius: var(--uui-border-radius);
        box-shadow: var(--uui-shadow-depth-3);
        overflow: hidden;
      }

      :host([dropdown-direction='horizontal']) #hidden-tabs-container {
        flex-direction: row;
      }

      #more-button {
        position: relative;
        --uui-button-contrast: var(--uui-tab-text);
        --uui-button-contrast-hover: var(--uui-tab-text-hover);
        --uui-button-background-color: transparent;
        --uui-button-background-color-hover: transparent;
      }
      #more-button::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-current);
        height: 0px;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition:
          opacity ease-in 120ms,
          height ease-in 120ms;
      }
      #more-button.active-inside::before {
        opacity: 1;
        height: 4px;
        transition:
          opacity 120ms,
          height ease-out 120ms;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
