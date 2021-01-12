import { LitElement, html, css, property } from 'lit-element';
import { UUIListItemClickEvent } from '../../../event/UUIListItemClickEvent';
/**
 *  @element uui-list-item
 *
 */

export class UUIListItemElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      button {
        display: block;
        font-size: 1rem;
        border: none;
        box-shadow: none;
        cursor: pointer;
        height: 100%;
        width: 100%;
        padding: 0.5em;
      }

      button:hover {
        background-color: lightgrey;
      }

      :host([selected]) button {
        background-color: pink;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  selected = false;

  private _onClick() {
    if (!this.selected) {
      this.selected = true;
    } else this.selected = false;
    this.dispatchEvent(
      new UUIListItemClickEvent('list-item-select', {
        detail: { source: 'somethi8ng', selected: this.selected },
      })
    );
  }

  render() {
    return html`
      <button id="list-item" @click="${this._onClick}">
        <slot name="left"></slot>
        <span><slot></slot></span>
        <slot name="right"></slot>
      </button>
    `;
  }
}
