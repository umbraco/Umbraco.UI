import { css, html, LitElement } from 'lit';

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
        padding: var(--uui-size-space-3);
        border-bottom: 1px solid var(--uui-interface-border);
        max-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }
    `,
  ];

  private _detectOverflow() {
    if (this.scrollWidth > this.clientWidth) {
      this.setAttribute('title', this.innerText);
    } else {
      this.removeAttribute('title');
    }
  }

  private onResize = () => {
    this._detectOverflow();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.onResize);
    this.setAttribute('role', 'cell');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return html` <slot @slotchange=${this._detectOverflow}></slot> `;
  }
}
