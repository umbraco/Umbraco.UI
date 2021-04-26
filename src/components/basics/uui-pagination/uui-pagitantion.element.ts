import {
  LitElement,
  html,
  css,
  property,
  internalProperty,
  query,
  queryAll,
} from 'lit-element';
import { UUIPaginationButtonElement } from './uui-pagination-button.element';

//TODO maybe use repeat directive?
export class UUIPaginationElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        border: 1px solid red;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', `Pagination ${this.label}`);
    this._filterPages(this.current);
  }

  private _generatePages(start: number, stop: number, step: number) {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  }

  private _filterPages(current: number) {
    // const pages = this._generatePages(1, this.count, 1).filter(
    //   p => p > current - this.range && p < current + this.range
    // );
    const start = current <= this.range ? 1 : current - this.range;
    const stop = current < this.range ? this.range * 2 : current + this.range;
    const pages = this._generatePages(start, stop, 1);
    this.pages = pages;
    if (this.pageButtons) {
      const notCurrent = this.pageButtons.filter(
        //TODO fix this
        button => button.page !== current
      );
      notCurrent.forEach(el => (el.disabled = false));
    }
  }

  @queryAll('uui-pagination-button')
  pageButtons!: Array<UUIPaginationButtonElement>;

  @property()
  label = '';

  setCurrentPage(e: MouseEvent) {
    const element = e.target as UUIPaginationButtonElement;
    element.disabled = true;
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
    this._filterPages(this._current);
    this.requestUpdate('current', oldValue);
  }

  @property({ type: Number, reflect: true })
  count = 10;

  @property({ type: Number })
  range = 3;

  @internalProperty()
  pages: number[] = [];

  render() {
    return html`
      <span>Previous</span> ${this.current < this.range
        ? ''
        : html`<span>First</span>`}
      ${this.pages.includes(1) ? '' : html`<span>...</span>`}
      ${this.pages.map(
        page =>
          html`<uui-pagination-button
            .page=${page}
            @click=${this.setCurrentPage}
          ></uui-pagination-button>`
      )}
      ${this.pages.includes(this.count) ? '' : html`<span>...</span>`}
      ${this.current > this.count - this.range ? '' : html`<span>Last </span>`}
      <span>Next</span>
    `;
  }
}
