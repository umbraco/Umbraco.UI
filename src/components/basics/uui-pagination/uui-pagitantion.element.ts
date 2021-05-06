import { LitElement, html, css } from 'lit';
import { property, queryAll, state } from 'lit/decorators';
import { UUIPaginationButtonElement } from './uui-pagination-button.element';

//TODO maybe use repeat directive?
export class UUIPaginationElement extends LitElement {
  static styles = [
    css`
      uui-pagination-button {
        min-width: 36px;
        --uui-button-slot-margin-x-factor: 1;
        --uui-button-slot-padding-l-factor: 1;
        --uui-button-slot-padding-r-factor: 1;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', `Pagination ${this.label}`);
    this.pages = this._filterPages(this.current + 1);
  }

  private _generatePages(start: number, stop: number, step: number) {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  }

  private _filterPages(current: number) {
    const start =
      current < this.range
        ? 1
        : current < this.count - this.range
        ? current - this.range
        : this.count - this.range * 2;

    const stop =
      current <= this.range
        ? this.range * 2 + 1
        : current < this.count - this.range
        ? current + this.range
        : this.count;

    const pages = this._generatePages(
      this.valueLimit(start, 1, this.count),
      this.valueLimit(stop, 1, this.count),
      1
    );

    return pages;
  }

  private valueLimit(val: number, min: number, max: number) {
    return val < min ? min : val > max ? max : val;
  }

  @queryAll('uui-pagination-button')
  pageButtons!: Array<UUIPaginationButtonElement>;

  @property()
  label = '';

  setCurrentPage(e: MouseEvent) {
    const element = e.target as UUIPaginationButtonElement;
    this.current = element.page;
  }

  private _current = 1;
  @property({ type: Number, reflect: true })
  get current() {
    return this._current;
  }

  set current(newValue: number) {
    const oldValue = this._current;

    this._current =
      newValue > this.count ? this.count : newValue <= 1 ? 1 : newValue;
    this.previous = oldValue;

    this.pages = this._filterPages(this._current);

    this.requestUpdate('current', oldValue);
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

  public goToNextPage() {
    this.current++;
  }

  public goToPreviousPage() {
    this.current--;
  }

  public goToPage(page: number) {
    this.current = page;
  }

  @state()
  previous = 0;

  @property({ type: Number, reflect: true })
  count = 10;

  @property({ type: Number })
  range = 3;

  @state()
  pages: number[] = [];

  buttonsL() {
    return html`${this.pages.includes(1)
      ? ''
      : html`<uui-pagination-button
            look="outline"
            role="listitem"
            aria-label="Go to first page"
            @click=${() => this.goToPage(1)}
            >First</uui-pagination-button
          ><uui-pagination-button look="outline" tabindex="-1"
            >...</uui-pagination-button
          >`}`;
  }

  render() {
    // prettier-ignore
    return html`<uui-button-group role="list"
      ><uui-pagination-button look="outline" role="listitem"
            aria-label="Go to previous page" @click=${this.goToPreviousPage}>Previous</uui-pagination-button
      >${this.buttonsL()}${this.pages.map(
        page =>
          html`<uui-pagination-button
            look="outline"
            role="listitem"
            .ariaLabel='Go to page ${page}'
            .page=${page}
            @click=${this.setCurrentPage}
            >${page}</uui-pagination-button
          >`
      )}${this.pages.includes(this.count)
        ? ''
        : html`<uui-pagination-button look="outline" tabindex="-1">...</uui-pagination-button
            ><uui-pagination-button role="listitem"
            aria-label="Go to last page" look="outline" @click=${() => this.goToPage(this.count)}
              >Last</uui-pagination-button
            >`}<uui-pagination-button role="listitem"
            aria-label="Go to next page" look="outline" @click=${this.goToNextPage}
        >Next</uui-pagination-button
      ></uui-button-group
    >`;
  }
}
