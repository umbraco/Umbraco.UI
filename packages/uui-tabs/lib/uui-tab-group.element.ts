import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import type { UUIButtonElement } from '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-button/lib/uui-button.element';
import '@umbraco-ui/uui-popover-container/lib/uui-popover-container.element';

import { UUITabElement } from './uui-tab.element';

/**
 *  @element uui-tab-group
 *  @slot - Default slot for the tab group
 */
@defineElement('uui-tab-group')
export class UUITabGroupElement extends LitElement {
  @query('#more-button')
  moreButtonElement!: UUIButtonElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-tab, [uui-tab], [role=tab]',
  })
  private _slottedNodes?: HTMLElement[];

  @property({ type: Boolean, reflect: true, attribute: 'priority-navigation' })
  priorityNavigation = false;

  private _tabElements: HTMLElement[] = [];

  #hiddenTabElements: HTMLElement[] = [];
  #visibilityBreakpoints: number[] = [];

  #resizeObserver: ResizeObserver = new ResizeObserver(
    this.#onResize.bind(this)
  );

  #onResize(entries: ResizeObserverEntry[]) {
    this.#updateCollapsibleTabs(entries[0].contentBoxSize[0].inlineSize);
  }

  #updateCollapsibleTabs(containerWidth: number) {
    containerWidth = containerWidth - this.moreButtonElement.offsetWidth;

    this.#hiddenTabElements = []; //TODO - remove eventlisteners

    for (let i = 0; i < this.#visibilityBreakpoints.length; i++) {
      const breakpoint = this.#visibilityBreakpoints[i];

      if (breakpoint < containerWidth) {
        this._tabElements[i].style.display = '';
        this.moreButtonElement.style.display = 'none';
      } else {
        this.#hiddenTabElements.push(
          this.#createHiddenTabElement(this._tabElements[i] as UUITabElement)
        );
        this._tabElements[i].style.display = 'none';
        this.moreButtonElement.style.display = '';
      }
    }

    this.requestUpdate();
  }

  #createHiddenTabElement(tab: UUITabElement) {
    const hiddenTab = document.createElement('uui-button');
    hiddenTab.innerText = tab.innerText;
    // hiddenTab.active = tab.active;
    hiddenTab.disabled = tab.disabled;
    hiddenTab.href = tab.href;
    hiddenTab.target = tab.target;
    hiddenTab.setAttribute('role', 'tab');
    hiddenTab.setAttribute('aria-selected', tab.active.toString());
    hiddenTab.setAttribute('aria-disabled', tab.disabled.toString());
    hiddenTab.addEventListener('click', this._onTabClicked);
    return hiddenTab;
  }

  #calculateBreakPoints() {
    // Whenever a tab is added or removed, we need to recalculate the breakpoints
    let childrenWidth = 0;

    for (let i = 0; i < this._tabElements.length; i++) {
      childrenWidth += this._tabElements[i].offsetWidth;
      this.#visibilityBreakpoints[i] = childrenWidth;
    }

    this.#updateCollapsibleTabs(this.offsetWidth);
  }

  private _setTabArray() {
    console.log('set tab array');

    this._tabElements = this._slottedNodes ? this._slottedNodes : [];
    this.#calculateBreakPoints();
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
    this.#resizeObserver.observe(this);
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tablist');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.unobserve(this);
  }

  render() {
    return html`
      <slot @slotchange=${this._onSlotChange}></slot>
      <uui-button
        popovertarget="my-popover"
        style="display: none"
        id="more-button"
        >MORE</uui-button
      >
      <uui-popover-container
        id="my-popover"
        popover
        margin="10"
        placement="bottom-end">
        <div id="hidden-tabs">
          ${repeat(this.#hiddenTabElements, el => html`${el}`)}
        </div>
      </uui-popover-container>
    `;
  }

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

      #hidden-tabs {
        width: 200px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
      }
      #more-button {
        margin-left: auto;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
