import {
  LitElement,
  html,
  css,
  property,
  query,
  queryAssignedNodes,
} from 'lit-element';
import { UUISelectListItemEvent } from './UUISelectListItemEvent';

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
        color: var(--uui-interface-contrast);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1rem;
        font-family: inherit;
        cursor: pointer;
        padding: 0.5em;
        background-color: var(--uui-interface-background);
      }

      :host(:hover) {
        background-color: var(--uui-interface-background-hover);
      }

      :host([selected]) {
        background-color: var(--uui-color-space-cadet);
        color: var(--uui-color-white);
      }
    `,
  ];

  @queryAssignedNodes('', true)
  _slot!: Node[];

  @property({ type: String })
  value = '';

  constructor() {
    super();
    this.addEventListener('click', this.toggleSelectElement);
  }

  //! this should probably traverse all the nodes and pick the correct one somehow, and then assign the value...
  firstUpdated() {
    if (this._slot[0].textContent) this.value = this._slot[0].textContent;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'option');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');
    if (!this.hasAttribute('aria-selected'))
      this.setAttribute('aria-checked', 'false');
  }

  private _selected = false;
  @property({ type: Boolean, reflect: true })
  get selected() {
    return this._selected;
  }

  set selected(newVal) {
    const oldVal = this._selected;
    this._selected = newVal;
    this.setAttribute('aria-checked', `${newVal}`);
    this.setAttribute('tabindex', `${newVal ? '0' : '-1'}`);
    this.requestUpdate('selected', oldVal);
  }

  @property({ type: Boolean, reflect: true })
  focused = false;

  @query('#list-item') protected listItem!: HTMLButtonElement;

  updated() {
    if (this.focused) this.listItem.focus();
  }

  toggleSelectElement(e: Event) {
    e.stopPropagation();
    this.selected = !this.selected;
    this.dispatchEvent(
      new UUISelectListItemEvent(UUISelectListItemEvent.CHANGE)
    );
  }

  render() {
    return html`
      <div id="list-item">
        <slot name="left"></slot>
        <span><slot></slot></span>
      </div>
      <slot name="right"></slot>
    `;
  }
}
