import { LitElement, html, css } from 'lit';
import { property, queryAll, state } from 'lit/decorators';
import { UUIPaginationButtonElement } from './uui-button.element';
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

const BUTTON_MIN_WIDTH = 36;
const BUTTON_MAX_WIDTH = 72;
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

    const navButtonWidth = Array.from(this.navButtons).reduce(
      (totalWidth, button) => {
        return totalWidth + button.getBoundingClientRect().width;
      },
      0
    );
    //TODO: use navButtonWidth for something. I´m confused by the math below, so please add description to it, or lets go through it, maybe it can be simplified.
    const rangeBaseWidth =
      this._containerWidth - 2 * BUTTON_MIN_WIDTH - 4 * BUTTON_MAX_WIDTH;

    const range = rangeBaseWidth / BUTTON_MIN_WIDTH / 2;
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

  @queryAll('uui-button')
  pageButtons!: Array<UUIPaginationButtonElement>;

  @queryAll('uui-button.nav-button')
  navButtons!: Array<UUIPaginationButtonElement>;

  @property()
  label = '';

  // TODO: Handle localization
  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel = '';

  @property({ type: Number, reflect: true })
  total = 10;

  private _range = 3;
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

  private _current = 1;
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

  public goToNextPage() {
    this.current++;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  public goToPreviousPage() {
    this.current--;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  public goToPage(page: number) {
    this.current = page;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  firstButtonTemplate() {
    return html`<uui-button
      compact
      class="nav-button"
      look="outline"
      role="listitem"
      aria-label="Go to first page"
      @click=${() => this.goToPage(1)}
      >First</uui-button
    >`;
  }

  previousButtonTemplate() {
    return html`<uui-button
      compact
      look="outline"
      class="nav-button"
      role="listitem"
      aria-label="Go to previous page"
      @click=${this.goToPreviousPage}
      >Previous</uui-button
    >`;
  }

  nextButtonTemplate() {
    return html`<uui-button
      compact
      role="listitem"
      class="nav-button"
      aria-label="Go to next page"
      look="outline"
      @click=${this.goToNextPage}
      >Next</uui-button
    >`;
  }

  lastButtonTemplate() {
    return html`<uui-button
      compact
      role="listitem"
      class="nav-button"
      aria-label="Go to last page"
      look="outline"
      @click=${() => this.goToPage(this.total)}
      >Last</uui-button
    >`;
  }

  dotsTemplate() {
    return html`<uui-button compact look="outline" tabindex="-1" disabled
      >...</uui-button
    > `;
  }

  pageTemplate(page: number) {
    return html`<uui-button
      compact
      look=${page === this._current ? 'primary' : 'outline'}
      ?disabled=${page === this._current}
      role="listitem"
      aria-label="Go to page ${page}"
      @click=${() => {
        this.goToPage(page);
      }}
      >${page}</uui-button
    >`;
  }

  navigationLeftTemplate() {
    return html`${this.visiblePages.includes(1)
      ? ''
      : this.firstButtonTemplate()}${this.previousButtonTemplate()}${this.visiblePages.includes(
      1
    )
      ? ''
      : this.dotsTemplate()}`;
  }

  navigationRightTemplate() {
    return html`${this.visiblePages.includes(this.total)
      ? ''
      : this.dotsTemplate()}${this.nextButtonTemplate()}${!this.visiblePages.includes(
      this.total
    )
      ? this.lastButtonTemplate()
      : ''}`;
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
