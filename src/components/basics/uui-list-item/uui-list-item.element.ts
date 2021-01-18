import { LitElement, html, css, property, query } from 'lit-element';
import { UUIListItemClickEvent } from '../../../event/UUIListItemClickEvent';
import { UUIListItemFocusEvent } from '../../../event/UUIListItemFocusEvent';

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

  @property({ type: Boolean, reflect: true })
  focused = false;

  @query('#list-item') protected button!: HTMLButtonElement;

  updated() {
    if (this.focused) this.button.focus();
  }

  private _onClick() {
    this.selected = !this.selected;
    this.dispatchEvent(
      new UUIListItemClickEvent('list-item-select', {
        detail: { selected: this.selected },
      })
    );
  }

  private _onFocus(e: Event) {
    this.focused = true;
    this.dispatchEvent(new UUIListItemFocusEvent());
  }

  private _onBlur(e: Event) {
    this.focused = false;
    this.dispatchEvent(new UUIListItemFocusEvent());
  }

  render() {
    return html`
      <button
        id="list-item"
        @click="${this._onClick}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <slot name="left"></slot>
        <span><slot></slot></span>
        <slot name="right"></slot>
      </button>
    `;
  }
}
// /  @keydown="${(e: KeyboardEvent) => {if (e.code === 'Enter') this._onClick;}}"
