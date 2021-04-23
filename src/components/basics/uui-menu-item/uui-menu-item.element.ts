import { LitElement, html, css, property, query } from 'lit-element';

/**
 *  @element uui-list-item
 *
 */

//TODO add the deselect method
//TODO implement propper style when it is ready

export class UUIMenuItemElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: inherit;
        font-size: 1rem;
        padding: 0.5em;
        background-color: var(--uui-interface-surface, #fff);
      }

      :host(:hover) {
        background-color: var(--uui-interface-surface-hover);
      }

      :host([active]) {
        background-color: var(--uui-interface-active, #f5c1bc);
      }

      :host([active]):hover {
        background-color: var(--uui-interface-active, #f5c1bc);
      }

      :host(:focus-within) {
        outline: 2px solid var(--uui-interface-selected, darkblue);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  active = false;

  // public _onClick() {
  //   this.active = !this.active;
  // }

  // constructor() {
  //   super();
  //   this.addEventListener('click', this._onClick);
  // }

  render() {
    return html`<slot></slot>`;
  }
}
