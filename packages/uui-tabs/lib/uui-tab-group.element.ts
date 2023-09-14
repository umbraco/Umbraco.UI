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

  @property({
    type: String,
    reflect: true,
    attribute: 'dropdown-direction',
  })
  dropdownDirection: 'vertical' | 'horizontal' = 'vertical';

  private _tabElements: HTMLElement[] = [];

  #hiddenTabElements: UUITabElement[] = [];
  #hiddenTabElementsMap: Map<UUITabElement, UUITabElement> = new Map();

  #visibilityBreakpoints: number[] = [];

  #resizeObserver: ResizeObserver = new ResizeObserver(
    this.#onResize.bind(this)
  );

  connectedCallback() {
    super.connectedCallback();
    this.#resizeObserver.observe(this);
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tablist');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.unobserve(this);
  }

  #onResize(entries: ResizeObserverEntry[]) {
    this.#updateCollapsibleTabs(entries[0].contentBoxSize[0].inlineSize);
  }

  #updateCollapsibleTabs(containerWidth: number) {
    containerWidth = containerWidth;
    const buttonWidth = this.moreButtonElement.offsetWidth;

    //TODO: Optimize so that we only update the hidden tabs when necessary. Currently we update them every time the container is resized.

    // Reset the hidden tabs
    this.#hiddenTabElements.forEach(el => {
      el.removeEventListener('click', this._onTabClicked);
    });
    this.#hiddenTabElements = [];
    this.#hiddenTabElementsMap.clear();

    let hasActiveHidden = false;

    for (let i = 0; i < this.#visibilityBreakpoints.length; i++) {
      const breakpoint = this.#visibilityBreakpoints[i];
      const tab = this._tabElements[i] as UUITabElement;

      if (
        breakpoint <
        containerWidth -
          (i !== this.#visibilityBreakpoints.length - 1 ? buttonWidth : 0)
      ) {
        tab.style.display = '';
        this.moreButtonElement.style.display = 'none';
      } else {
        // Make a proxy tab to put in the hidden tabs container and link it to the original tab
        const proxyTab = tab.cloneNode(true) as UUITabElement;
        proxyTab.addEventListener('click', this._onTabClicked);
        proxyTab.classList.add('hidden-tab');
        proxyTab.style.display = '';
        proxyTab.activeBarLocation =
          this.dropdownDirection === 'vertical' ? 'left' : 'bottom';

        this.#hiddenTabElementsMap.set(proxyTab, tab);
        this.#hiddenTabElementsMap.set(proxyTab, tab);
        this.#hiddenTabElements.push(proxyTab);

        tab.style.display = 'none';
        this.moreButtonElement.style.display = '';
        if (tab.active) {
          hasActiveHidden = true;
        }
      }
    }

    hasActiveHidden
      ? this.moreButtonElement.classList.add('active-inside')
      : this.moreButtonElement.classList.remove('active-inside');

    this.requestUpdate();
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
      const proxy = this.#hiddenTabElementsMap.get(selectedElement);

      if (proxy) {
        proxy.active = true;
      }

      const filtered = [
        ...this._tabElements,
        ...this.#hiddenTabElements,
      ].filter(el => el !== selectedElement && el !== proxy);

      filtered.forEach(el => {
        if (this._elementIsTabLike(el)) {
          el.active = false;
        }
      });

      const hasActiveHidden = this.#hiddenTabElements.some(
        el => el.active && el !== proxy
      );

      hasActiveHidden
        ? this.moreButtonElement.classList.add('active-inside')
        : this.moreButtonElement.classList.remove('active-inside');
    }
  };

  private _elementIsTabLike(el: any): el is UUITabElement {
    return el instanceof UUITabElement || 'active' in el;
  }

  render() {
    return html`
      <slot @slotchange=${this._onSlotChange}></slot>
      <uui-button
        popovertarget="popover-container"
        style="display: none"
        id="more-button"
        label="More"
        compact
        >MORE</uui-button
      >
      <uui-popover-container
        id="popover-container"
        popover
        margin="10"
        placement="bottom-end">
        <div id="hidden-tabs-container">
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

      .hidden-tab {
        width: 100%;
      }

      #hidden-tabs-container {
        width: fit-content;
        display: flex;
        flex-direction: column;
        background: var(--uui-color-surface);
        border-radius: var(--uui-border-radius);
        box-shadow: var(--uui-shadow-depth-3);
      }
      :host([dropdown-direction='horizontal']) #hidden-tabs-container {
        flex-direction: row;
      }

      #more-button {
        margin-left: auto;
        position: relative;
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
        transition: opacity ease-in 120ms, height ease-in 120ms;
      }
      #more-button.active-inside::before {
        opacity: 1;
        height: 4px;
        transition: opacity 120ms, height ease-out 120ms;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
