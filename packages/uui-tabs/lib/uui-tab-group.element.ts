import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { query, queryAssignedElements } from 'lit/decorators.js';

import type { UUITabElement } from './uui-tab.element';

/**
 * @element uui-tab-group
 * @slot - Default slot for the tab group
 * @cssprop --uui-tab-group-dropdown-tab-text - Define the tab text color in the dropdown
 * @cssprop --uui-tab-group-dropdown-tab-text-hover - Define the tab text hover color in the dropdown
 * @cssprop --uui-tab-group-dropdown-tab-text-active - Define the tab text active color in the dropdown
 * @cssprop --uui-tab-group-dropdown-background - Define the background color of the dropdown
 * @cssprop --uui-tab-group-gap - Define the gap between elements dropdown. Only pixel values are valid
 */
@defineElement('uui-tab-group')
export class UUITabGroupElement extends LitElement {
  @query('#main') private _mainElement!: HTMLElement;
  @query('#grid') private _gridElement!: HTMLElement;
  @query('#more-button-left') private _moreButtonLeftElement!: HTMLElement;
  @query('#more-button-right') private _moreButtonRightElement!: HTMLElement;

  @queryAssignedElements({
    flatten: true,
    selector: 'uui-tab, [uui-tab], [role=tab]',
  })
  private _slottedNodes?: HTMLElement[];

  #tabElements: UUITabElement[] = [];

  #resizeObserver = new ResizeObserver(this.#onResize.bind(this));

  connectedCallback() {
    super.connectedCallback();
    this.#initialize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.unobserve(this);
    this._gridElement.removeEventListener(
      'scroll',
      this.#updateScrollButtonsAfterScroll.bind(this),
    );

    this.#cleanupTabs();
  }

  async #initialize() {
    await this.updateComplete;
    this.#resizeObserver.observe(this._mainElement);
    this._gridElement.addEventListener(
      'scroll',
      this.#updateScrollButtonsAfterScroll.bind(this),
    );
  }

  #onResize() {
    this.#updateScrollButtons();
  }

  #cleanupTabs() {
    this.#tabElements.forEach(el => {
      el.removeEventListener('click', this.#onTabClicked);
    });
  }

  #onSlotChange() {
    this.#cleanupTabs();

    this.#setTabArray();

    this.#tabElements.forEach(el => {
      el.addEventListener('click', this.#onTabClicked);
    });

    this.#updateScrollButtons();
  }

  #onTabClicked = (e: MouseEvent) => {
    const selectedElement = e.currentTarget as HTMLElement;
    if (this.#isElementTabLike(selectedElement)) {
      selectedElement.active = true;

      // Reset all other tabs
      this.#tabElements
        .filter(el => el !== selectedElement)
        .forEach(el => (el.active = false));
    }
  };

  #setTabArray() {
    if (this._slottedNodes) {
      this.#tabElements = Array.from(this._slottedNodes).filter(
        this.#isElementTabLike,
        null,
      ) as UUITabElement[];
    } else {
      this.#tabElements = [];
    }
  }

  #isElementTabLike(el: any): el is UUITabElement {
    return (
      typeof el === 'object' && 'active' in el && typeof el.active === 'boolean'
    );
  }
  #scrollLeft() {
    this._gridElement.scrollBy({ left: -100, behavior: 'smooth' });
  }

  #scrollRight() {
    this._gridElement.scrollBy({ left: 100, behavior: 'smooth' });
  }

  #scrollTimeout: number | undefined;

  #updateScrollButtons() {
    if (this._gridElement.scrollLeft > 0) {
      this._moreButtonLeftElement.style.display = 'inline-flex';
      this.setAttribute('show-left-gradient', '');
    } else {
      this._moreButtonLeftElement.style.display = 'none';
      this.removeAttribute('show-left-gradient');
    }

    // Check if the grid is scrolled all the way to the right or if it doesn't need to scroll
    if (
      this._gridElement.scrollLeft + this._gridElement.clientWidth <
      this._gridElement.scrollWidth
    ) {
      this._moreButtonRightElement.style.display = 'inline-flex';
      this.setAttribute('show-right-gradient', '');
    } else {
      this._moreButtonRightElement.style.display = 'none';
      this.removeAttribute('show-right-gradient');
    }
  }

  #updateScrollButtonsAfterScroll() {
    // We are using a setTimeout mechanism to update after a scroll event
    // This is because scrollend event isn't supported by Safari at time of writing
    if (this.#scrollTimeout) {
      clearTimeout(this.#scrollTimeout);
    }
    this.#scrollTimeout = window.setTimeout(() => {
      this.#updateScrollButtons();
    }, 10);
  }

  render() {
    return html`
      <div id="main">
        <uui-button
          @click=${this.#scrollLeft}
          id="more-button-left"
          label="Scroll tabs to left"
          compact
          >&lt;
        </uui-button>
        <div id="grid" role="tablist">
          <slot @slotchange=${this.#onSlotChange}></slot>
        </div>
        <uui-button
          @click=${this.#scrollRight}
          id="more-button-right"
          label="Scroll tabs to right"
          compact
          >&gt;
        </uui-button>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
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
        display: flex;
        height: 100%;
        min-height: 48px;
        overflow-x: auto;
        white-space: nowrap;
        color: var(--uui-tab-text);
        gap: var(--uui-tab-group-gap, 0);
        scroll-snap-type: x mandatory;
        flex-grow: 1;
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-tab-divider, none);
      }

      :host([show-left-gradient]) #grid {
        mask-image: linear-gradient(
          to right,
          transparent,
          black 10%,
          black 100%
        );
      }

      :host([show-right-gradient]) #grid {
        mask-image: linear-gradient(
          to left,
          transparent,
          black 10%,
          black 100%
        );
      }

      :host([show-left-gradient][show-right-gradient]) #grid {
        mask-image: linear-gradient(
          to right,
          transparent,
          black 10%,
          black 90%,
          transparent
        );
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-group': UUITabGroupElement;
  }
}
