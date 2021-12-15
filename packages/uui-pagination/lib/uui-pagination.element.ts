import { LitElement, html, css } from 'lit';
import { property, query, queryAll, state } from 'lit/decorators.js';
import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';
import { UUIPaginationEvent } from './UUIPaginationEvent';

//this is how wide the button gets when it has 3 digits inside.
const PAGE_BUTTON_MAX_WIDTH = 45;

const valueLimit = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const generateArrayOfNumbers = (start: number, stop: number) => {
  return Array.from({ length: stop - start + 1 }, (_, i) => start + i);
};

/**
 * Umbraco UI pagination component. By implementing a resizeObserver it changes the number of visible buttons to fit the width of the container it sits in. Based on uui-button and uui-button-group.
 *
 * @element uui-pagination
 * @fires change - When clicked on the page button fires change event
 *
 */
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
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  private observer = new ResizeObserver(() => {
    this.calculateRange();
  });

  firstUpdated() {
    this.observer.observe(this.buttonGroup);

    this.updateLabel();
    this.calculateRange();
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

    // get all the buttons with .nav-button class and sum up their widths
    const navButtonsWidth = Array.from(this.navButtons).reduce(
      (totalWidth, button) => {
        return totalWidth + button.getBoundingClientRect().width;
      },
      0
    );

    // subtract width of navbuttons from the pagination container
    const rangeBaseWidth = this._containerWidth - navButtonsWidth;

    // divide remaining width by max-width of page button (when it has 3 digits), then divide by 2 to get the range.
    // Range is number of buttons visible on either "side" of current pag button. So, if range === 5 we shall see 11 buttons in total - 5 before the current page and 5 after. This is why we divide by 2.
    const range = rangeBaseWidth / PAGE_BUTTON_MAX_WIDTH / 2;
    this.range = Math.floor(range);
  };

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

    const pages = generateArrayOfNumbers(
      valueLimit(start, 1, this.total),
      valueLimit(stop, 1, this.total)
    );

    return pages;
  }

  @queryAll('uui-button.nav-button')
  navButtons!: Array<UUIButtonElement>;

  @query('#group')
  buttonGroup!: any;

  /**
   * This property is used to generate a proper `aria-label`. It will be announced by screen reader as: "<<this.label>>. Current page: <<this.current>>"
   * @type {string}
   * @attr
   */
  @property()
  label = '';

  // TODO: Handle localization
  /**
   * With this property you can overwrite aria-label.
   * @type {string}
   * @attr
   */
  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel = '';

  /**
   * With this property You can set how many buttons the pagination should have. Mind that the number of visible buttons will change with the width of the container.
   * @type {number}
   * @attr
   */
  @property({ type: Number })
  total = 1;

  protected _range = 0;
  @state()
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
  /**
   * This property says which page is currently shown.
   * @type {number}
   * @attr
   */
  @property({ type: Number })
  get current() {
    return this._current;
  }

  set current(newValue: number) {
    const oldValue = this._current;
    this._current = valueLimit(newValue, 1, this.total);
    this.visiblePages = this._generateVisiblePages(this._current);
    this.requestUpdate('current', oldValue);
  }

  /**
   * This method will change the page to a next one.
   */
  goToNextPage() {
    this.current++;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  /**
   * This method will change the page to a previous one.
   */
  goToPreviousPage() {
    this.current--;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  /**
   * This method will change the page to the one passed as an argument to this method.
   */
  goToPage(page: number) {
    this.current = page;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  /** When having limited display of page-buttons and clicking a page-button that changes the current range, the focus stays on the position of the clicked button which is not anymore representing the number clicked, therefore we move focus to the button that represents the current page. */
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
      ?disabled=${this.current === 1}
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
      ?disabled=${this.current === 1}
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
      ?disabled=${this.current === this.total}
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
    return html`<uui-button-group role="list" id="group">
      ${this.navigationLeftTemplate()}${this.visiblePages.map(
        page =>
          this.pageTemplate(page)
      )}${this.navigationRightTemplate()}</uui-button-group>
    `;
  }
}
