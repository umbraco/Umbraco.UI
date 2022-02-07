import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  Table cell that detects if it has overflow and if so it'll add a title attribute to itself to display full text. Must be a child of uui-table-row
 *  @element uui-table-cell
 *  @slot for table cell content
 */
@defineElement('uui-table-cell')
export class UUITableCellElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-cell;
        height: var(--uui-size-12);
        padding: var(
          --uui-table-cell-padding,
          var(--uui-size-4) var(--uui-size-5)
        );
        border-top: 1px solid var(--uui-interface-border);
        vertical-align: middle;
      }

      :host([clip-text]) {
        max-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }

      :host([disable-child-interaction]) ::slotted(*) {
        pointer-events: none;
      }

      :host([disable-child-interaction])::after {
        content: '';
        position: absolute;
        inset: 0;
      }
    `,
  ];

  /**
   * Used to enforce selection interaction by preventing other interactions, primary set by table-row for select-only mode.
   * @attr
   * @type boolean
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'disable-child-interaction',
  })
  disableChildInteraction = false;

  /**
   * Remove padding in order to have element going to the edge of the cell.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-padding' })
  noPadding = false;

  /**
   * Enable overflow ellipsis
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'clip-text' })
  clipText = false;

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

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('clipText')) {
      if (this.clipText) {
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

declare global {
  interface HTMLElementTagNameMap {
    'uui-table-cell': UUITableCellElement;
  }
}
