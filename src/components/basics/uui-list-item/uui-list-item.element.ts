import { LitElement, html, css, property } from 'lit-element';

/**
 *  @element uui-list-item
 *
 */

export class UUIListItemElement extends LitElement {
  static styles = [
    css`
      :host {
        border: solid 1px blue;
        display: block;
      }

      #list-item {
        display: inline-block;
        background-color: pink;
      }
    `,
  ];

  render() {
    return html`
      <button id="list-item">
        <slot name="left"></slot>
        <span><slot></slot></span>
        <slot name="right"></slot>
      </button>
    `;
  }
}
