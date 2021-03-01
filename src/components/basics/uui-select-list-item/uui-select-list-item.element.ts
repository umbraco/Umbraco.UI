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
        background-color: var(--uui-interface-surface);
      }

      :host(:hover) {
        background-color: var(--uui-interface-surface-hover);
      }

      :host([selected]) {
        background-color: var(--uui-interface-selected);
        color: var(--uui-interface-selected-contrast);
      }

      #list-item {
        display: flex;
        align-items: center;
      }
    `,
  ];

  @queryAssignedNodes('', true)
  _slot!: Node[];

  @property({ type: String })
  value = '';

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
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
      this.setAttribute('aria-selected', 'false');
  }

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  focused = false;

  @query('#list-item') protected listItem!: HTMLButtonElement;

  updated() {
    if (this.focused) this.listItem.focus();
  }

  private handleClick(e: Event) {
    e.stopPropagation();
    this.select();
  }

  public select() {
    this.selected = true;
    if (!this.disabled) {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-selected', 'true');
      this.focus();
    }
    this.dispatchEvent(
      new UUISelectListItemEvent(UUISelectListItemEvent.CHANGE)
    );
  }

  public deselect() {
    this.selected = false;
    this.setAttribute('tabindex', '-1');
    this.setAttribute('aria-selected', 'false');
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
