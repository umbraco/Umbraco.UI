import { LitElement, html, css, property } from 'lit-element';

export class UUIPaginationButtonElement extends LitElement {
  static styles = [
    css`
      :host {
        border: 1px solid blue;
        cursor: pointer;
        padding: 1em;
      }

      :host([disabled]) {
        background-color: darkgreen;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener('click', this._captureClick);
  }

  private _captureClick(e: MouseEvent) {
    if (this.disabled === false) return;
    e.stopImmediatePropagation();
    e.preventDefault();
  }

  @property({ type: Number })
  page = 0;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`${this.page}`;
  }
}
