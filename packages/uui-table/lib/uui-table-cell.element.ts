import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  Table cell that detects if it has overflow and if so it'll add a title attribute to itself to display full text. Must be a child of uui-table-row
 *  @element uui-table-cell
 *  @slot for table cell content
 */
export class UUITableCellElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-cell;
        padding: var(--uui-size-4) var(--uui-size-5);
        border-top: 1px solid var(--uui-interface-border);
        vertical-align: middle;
      }

      :host([overflow-ellipsis]) {
        max-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }
    `,
  ];

  /**
   * Some description here
   * @type {number}
  /**
   * Enable overflow ellipsis
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'overflow-ellipsis' })
  overflowEllipsis = false;

  private _observer = new ResizeObserver(() => {
    this._detectOverflow();
  });

  private _detectOverflow() {
    if (this.scrollWidth > this.clientWidth) {
      this.setAttribute('title', this.innerText);
    } else {
      this.removeAttribute('title');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'cell');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  updated(changedProperties: any) {
    if (changedProperties.has('overflowEllipsis')) {
      if (this.overflowEllipsis) {
        this._detectOverflow();
        this._observer.observe(this);
      } else {
        this._observer.disconnect();
      }
    }
  }

  render() {
    return html` <slot @slotchange=${this._detectOverflow}></slot>`;
  }
}
