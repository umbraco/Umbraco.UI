import { css, html, LitElement } from 'lit';

export class UUITableColumnElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table-column;
      }
    `,
  ];
}
