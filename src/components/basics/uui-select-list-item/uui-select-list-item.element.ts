import { LitElement, html, css, property, query } from 'lit-element';
import { UUIListItemClickEvent } from '../../../event/UUIListItemClickEvent';

/**
 *  @element uui-list-item
 *
 */

//TODO add the deselect method
//TODO rename that to select-list-item

export class UUISelectListItemElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      button {
        color: var(--uui-interface-contrast);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1rem;
        font-family: inherit;
        border: none;
        box-shadow: none;
        cursor: pointer;
        height: 100%;
        width: 100%;
        padding: 0.5em;
        background-color: var(--uui-interface-background);
      }

      button:hover {
        background-color: var(--uui-interface-background-hover);
      }

      :host([selected]) button {
        background-color: var(--uui-color-space-cadet);
        color: var(--uui-color-white);
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

  private _onFocus() {
    this.focused = true;
  }

  private _onBlur() {
    this.focused = false;
  }

  render() {
    return html`
      <button
        id="list-item"
        @click="${this._onClick}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <div>
          <slot name="left"></slot>
          <span><slot></slot></span>
        </div>
        <slot name="right"></slot>
      </button>
    `;
  }
}
