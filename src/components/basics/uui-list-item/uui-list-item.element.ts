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

  //this is works but throws an error
  async attributeChangedCallback() {
    super.attributeChangedCallback('focused', null, null);
    await this.updateComplete;
    this.button.focus();
  }

  private _onClick() {
    if (!this.selected) {
      this.selected = true;
    } else this.selected = false;
    this.dispatchEvent(
      new UUIListItemClickEvent('list-item-select', {
        detail: { source: 'something', selected: this.selected },
      })
    );
  }

  private _onFocus(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new UUIListItemFocusEvent());
  }

  render() {
    return html`
      <button
        id="list-item"
        @click="${this._onClick}"
        @focus="${this._onFocus}"
      >
        <slot name="left"></slot>
        <span><slot></slot></span>
        <slot name="right"></slot>
      </button>
    `;
  }
}
