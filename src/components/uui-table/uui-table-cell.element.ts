import { css, html, LitElement } from 'lit';

export class UUITableCellElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-cell;
        padding: 1em;
        color: currentColor;
        border-top: 1px solid #e9e9eb;
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResize);
  }

  firstUpdated() {
    this._detectOverflow();
  }

  render() {
    return html`<slot></slot>`;
  }
}
