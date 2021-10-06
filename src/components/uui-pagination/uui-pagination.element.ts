import { LitElement, html, css } from 'lit';
import { property, queryAll, state } from 'lit/decorators.js';
import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';

import { UUIPaginationEvent } from './UUIPaginationEvent';
//TODO change focus after click

//?? button group-within button-group

/**
 * Pagination
 *
 * @element uui-pagination
 *
 * @fires change - When clicked on the page button fires change event
 *
 */

const PAGE_BUTTON_MAX_WIDTH = 45;

export class UUIPaginationElement extends LitElement {
  static styles = [
    css`
      uui-button {
        min-width: 36px;
        max-width: 72px;
      }

      .nav-button {
        min-width: 72px;
      }

      uui-button-group {
        width: 100%;
      }

      .dots-button {
        pointer-events: none;
      }

      .active-button {
        pointer-events: none;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.visiblePages = this._generateVisiblePages(this.current);
    window.addEventListener('resize', this.calculateRange);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.calculateRange);
  }

  firstUpdated() {
    this.updateLabel();
    // Wait for first rendering complete:
    window.requestAnimationFrame(() => {
      this.calculateRange();
    });
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('current') || changedProperties.has('label')) {
      this.updateLabel();
    }
  }

  updateLabel() {
    this.ariaLabel = `${this.label || 'Pagination navigation'}. Current page: ${
      this.current
    }.`;
  }

  private _containerWidth = 0;

  private calculateRange = () => {
    this._containerWidth = this.offsetWidth;

    // get all the buttons with .nav-button class and sum up thier widths
    const navButtonsWidth = Array.from(this.navButtons).reduce(
      (totalWidth, button) => {
        return totalWidth + button.getBoundingClientRect().width;
      },
      0
    );

    // substract width of navbuttons from the pagination container
    const rangeBaseWidth = this._containerWidth - navButtonsWidth;

    // divide remaining width by max-width of page button (when it has 3 digits), then divide by 2 to get the range.
    // Range is number of buttons visible on either "side" of current pag button. So, if range === 5 we shall see 11 buttons in total - 5 before the curent page and 5 after. This is why we divide by 2.
    const range = rangeBaseWidth / PAGE_BUTTON_MAX_WIDTH / 2;
    this.range = Math.floor(range);
  };

  private _generateArrayOfNumbers(start: number, stop: number) {
    return Array.from({ length: stop - start + 1 }, (_, i) => start + i);
  }

  private _generateVisiblePages(current: number) {
    const start =
      current < this._range
        ? 1
        : current < this.total - this._range
        ? current - this._range
        : this.total - this._range * 2;

    const stop =
      current <= this._range
        ? this._range * 2 + 1
        : current < this.total - this._range
        ? current + this._range
        : this.total;

    const pages = this._generateArrayOfNumbers(
      this._valueLimit(start, 1, this.total),
      this._valueLimit(stop, 1, this.total)
    );

    return pages;
  }

  private _valueLimit(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
  }

  @queryAll('uui-button.nav-button')
  navButtons!: Array<UUIButtonElement>;

  @property()
  label = '';

  // TODO: Handle localization
  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel = '';

  @property({ type: Number })
  total = 1;

  protected _range = 0;
  @property({ type: Number })
  get range() {
    return this._range;
  }

  set range(newValue: number) {
    const oldValue = this._range;
    this._range = newValue <= 0 ? 1 : newValue;
    this.visiblePages = this._generateVisiblePages(this.current);
    this.requestUpdate('range', oldValue);
  }

  @state()
  visiblePages: number[] = [];

  protected _current = 1;
  @property({ type: Number, reflect: true })
  get current() {
    return this._current;
  }

  set current(newValue: number) {
    const oldValue = this._current;
    this._current = this._valueLimit(newValue, 1, this.total);
    this.visiblePages = this._generateVisiblePages(this._current);
    this.requestUpdate('current', oldValue);
  }

  protected goToNextPage() {
    this.current++;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  protected goToPreviousPage() {
    this.current--;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  protected goToPage(page: number) {
    this.current = page;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  /** When having limited display of page-buttons and clicking a page-button that changes the current range, the focus stays on the position of the clicked button which is not anymore representing the number clicked, therefor we move focus to the button that represents the current page. */
  protected setFocusActivePageButton() {
    requestAnimationFrame(() => {
      // for none range changing clicks we need to ensure a rendering before querying.
      const activeButtonElement =
        this.renderRoot.querySelector<HTMLElement>('.active-button');
      if (activeButtonElement) {
        activeButtonElement.focus();
      }
    });
  }

  protected firstButtonTemplate() {
    return html`<uui-button
      compact
      look="outline"
      class="nav-button"
      role="listitem"
      aria-label="Go to first page"
      .disabled=${1 === this._current}
      @click=${() => this.goToPage(1)}>
      First
    </uui-button>`;
  }

  protected previousButtonTemplate() {
    return html`<uui-button
      compact
      look="outline"
      class="nav-button"
      role="listitem"
      aria-label="Go to previous page"
      .disabled=${this.current === 1}
      @click=${this.goToPreviousPage}>
      Previous
    </uui-button>`;
  }

  protected nextButtonTemplate() {
    return html`<uui-button
      compact
      look="outline"
      role="listitem"
      class="nav-button"
      aria-label="Go to next page"
      .disabled=${this.current === this.total}
      @click=${this.goToNextPage}>
      Next
    </uui-button>`;
  }

  protected lastButtonTemplate() {
    return html`
      <uui-button
        compact
        look="outline"
        role="listitem"
        class="nav-button"
        aria-label="Go to last page"
        ?disabled=${this.total === this._current}
        @click=${() => this.goToPage(this.total)}>
        Last
      </uui-button>
    `;
  }

  protected dotsTemplate() {
    return html`<uui-button
      compact
      look="outline"
      tabindex="-1"
      class="dots-button"
      >...</uui-button
    > `;
  }

  protected pageTemplate(page: number) {
    return html`<uui-button
      compact
      look=${page === this._current ? 'primary' : 'outline'}
      role="listitem"
      aria-label="Go to page ${page}"
      class=${page === this._current ? 'active-button' : ''}
      tabindex=${page === this._current ? '-1' : ''}
      @click=${() => {
        if (page === this._current) return;
        this.goToPage(page);
        this.setFocusActivePageButton();
      }}
      >${page}</uui-button
    >`;
  }

  protected navigationLeftTemplate() {
    return html` ${this.firstButtonTemplate()} ${this.previousButtonTemplate()}
    ${this.visiblePages.includes(1) ? '' : this.dotsTemplate()}`;
  }

  protected navigationRightTemplate() {
    return html`${this.visiblePages.includes(this.total)
      ? ''
      : this.dotsTemplate()}
    ${this.nextButtonTemplate()} ${this.lastButtonTemplate()}`;
  }

  render() {
    // prettier-ignore
    return html`<uui-button-group role="list">
      ${this.navigationLeftTemplate()}${this.visiblePages.map(
        page =>
          this.pageTemplate(page)
      )}${this.navigationRightTemplate()}</uui-button-group>
    `;
  }
}
