import { LitElement, html, css } from 'lit-element';

/**
 *  @element uui-list
 *
 */

export class UUIListElement extends LitElement {
  static styles = [
    css`
      :host {
        background-color: red;
      }
    `,
  ];

  render() {
    return html` hello i'll be a list `;
  }
}
