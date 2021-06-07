import { LitElement, html, css } from 'lit';
import { property, queryAll, state } from 'lit/decorators';
import { UUIPaginationButtonElement } from './uui-pagination-button.element';
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
      uui-pagination-button {
        min-width: 36px;
        max-width: 72px;
        --uui-button-slot-margin-x-factor: 1;
        --uui-button-slot-padding-l-factor: 1;
        --uui-button-slot-padding-r-factor: 1;
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
    //this.setAttribute('aria-label', `Pagination ${this.label}. Current page ${this.current}`);
    this.visiblePages = this._generateVisiblePages(this.current + 1);
    window.addEventListener('resize', this.calculateRange);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.calculateRange);
  }

  firstUpdated() {
    this.calculateRange();
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('current') || changedProperties.has('label'))
      this.ariaLabel = `Pagination ${
        this.label ? this.label : 'navigation'
      }. Current page: ${this.current}.`;
  }

  updated() {
    if (this.pageButtons) {
      const buttons = Array.from(this.pageButtons);
      buttons.forEach(button => {
        if (button.page === this._current) {
          button.disabled = true;
          button.look = 'primary';
        } else {
          button.disabled = false;
          button.look = 'outline';
        }
      });
    }
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
    console.log(navButtonWidth); //? why is this returning 0?
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
      current < this.range
        ? 1
        : current < this.total - this.range
        ? current - this.range
        : this.total - this.range * 2;

    const stop =
      current <= this.range
        ? this.range * 2 + 1
        : current < this.total - this.range
        ? current + this.range
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

  @queryAll('uui-pagination-button')
  pageButtons!: Array<UUIPaginationButtonElement>;

  @queryAll('uui-pagination-button.nav-button')
  navButtons!: Array<UUIPaginationButtonElement>;

  @property()
  label = '';

  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel = `Pagination Navigation. Current page 1`;

  @state()
  previous = 0;

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
    this.previous = oldValue;
    this.visiblePages = this._generateVisiblePages(this._current);
    this.requestUpdate('current', oldValue);
  }

  public setCurrentPage(e: MouseEvent) {
    const element = e.target as UUIPaginationButtonElement;
    this.current = element.page;
    this.dispatchEvent(new UUIPaginationEvent(UUIPaginationEvent.CHANGE));
  }

  public goToNextPage() {
    this.current++;
  }

  public goToPreviousPage() {
    this.current--;
  }

  public goToPage(page: number) {
    this.current = page;
  }

  buttonFirstTemplate() {
    return html`<uui-pagination-button
      class="nav-button"
      look="outline"
      role="listitem"
      aria-label="Go to first page"
      @click=${() => this.goToPage(1)}
      >First</uui-pagination-button
    >`;
  }

  buttonPreviousTemplate() {
    return html`<uui-pagination-button
      look="outline"
      class="nav-button"
      role="listitem"
      aria-label="Go to previous page"
      @click=${this.goToPreviousPage}
      >Previous</uui-pagination-button
    >`;
  }

  buttonNextTemplate() {
    return html`<uui-pagination-button
      role="listitem"
      class="nav-button"
      aria-label="Go to next page"
      look="outline"
      @click=${this.goToNextPage}
      >Next</uui-pagination-button
    >`;
  }

  buttonLastTemplate() {
    return html`<uui-pagination-button
      role="listitem"
      class="nav-button"
      aria-label="Go to last page"
      look="outline"
      @click=${() => this.goToPage(this.total)}
      >Last</uui-pagination-button
    >`;
  }

  buttonDotsTemplate() {
    return html`<uui-pagination-button look="outline" tabindex="-1"
      >...</uui-pagination-button
    >`;
  }

  buttonPageTemplate(page: number) {
    return html`<uui-pagination-button
      look="outline"
      role="listitem"
      .ariaLabel="Go to page ${page}"
      .page=${page}
      @click=${this.setCurrentPage}
      >${page}</uui-pagination-button
    >`;
  }

  buttonsLTemplate() {
    return html`${this.visiblePages.includes(1)
      ? ''
      : this.buttonFirstTemplate()}${this.buttonPreviousTemplate()}${this.visiblePages.includes(
      1
    )
      ? ''
      : this.buttonDotsTemplate()}`;
  }

  buttonsRTemplate() {
    return html`${this.visiblePages.includes(this.total)
      ? ''
      : this.buttonDotsTemplate()}${this.buttonNextTemplate()}${!this.visiblePages.includes(
      this.total
    )
      ? this.buttonLastTemplate()
      : ''}`;
  }

  render() {
    // prettier-ignore
    return html`<uui-button-group role="list"
      >${this.buttonsLTemplate()}${this.visiblePages.map(
        page =>
          this.buttonPageTemplate(page)
      )}${this.buttonsRTemplate()}</uui-button-group
    >`;
  }
}
