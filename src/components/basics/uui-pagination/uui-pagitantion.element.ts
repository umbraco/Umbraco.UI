import { LitElement, html, css } from 'lit';
import { property, queryAll, state } from 'lit/decorators';
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

  private _doCrazyStuff(current: number, previous: number) {
    const delta = previous - current;
    const moveBack = delta > 0;
    const moveForward = delta < 0;

    this.pages = this._filterPages(this.current);

    console.log(
      this.current,
      delta,
      `forward ${moveForward}`,
      `backward ${moveBack}`,
      this.pages
    );
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

    this._doCrazyStuff(this._current, this.previous);

    this.requestUpdate('current', oldValue);
    console.log(this._current);
  }

  updated() {
    if (this.pageButtons) {
      const buttons = Array.from(this.pageButtons);
      buttons.forEach(button => {
        if (button.page === this._current) button.disabled = true;
        else button.disabled = false;
      });
    }
  }

  @state()
  previous = 0;

  @property({ type: Number, reflect: true })
  count = 10;

  @property({ type: Number })
  range = 3;

  @state()
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
