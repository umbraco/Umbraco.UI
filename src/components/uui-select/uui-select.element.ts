import { html, css } from 'lit';
import { query, property } from 'lit/decorators';
import { UUIDropdownElement } from '../uui-dropdown/uui-dropdown.element';
import { UUISingleSelectBaseElement } from './uui-single-select-base.element';
import { keys } from './keys';
/**
 *  @element uui-select
 *  @slot - for stuff
 */

export class UUISelectElement extends UUISingleSelectBaseElement {
  static styles = [
    css`
      :host {
        font-family: inherit;
        /* TODO: I don't think we need a custom prop for this, as impl can just set width on the comp. */
        --uui-select-width: 200px;
        width: var(--uui-select-width);
        display: inline-block;
        border: 1px solid var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius);
      }

      :host(:focus-within) {
        box-shadow: 0 0 2px 1px var(--uui-interface-border-focus);
      }

      uui-dropdown {
        display: flex;
        width: 100%;
        height: 100%;
      }

      uui-dropdown:focus {
        outline: none;
      }

      uui-overflow-container {
        min-width: var(--uui-select-width);
        outline: none;
      }

      #selected-value {
        display: flex;
        align-items: center;

        width: 100%;

        font-family: inherit;
        font-size: 1rem;
        padding: var(--uui-size-small);
      }

      #caret {
        margin-left: auto;
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;
      }

      #placeholder {
        font-style: italic;
        color: var(--uui-interface-contrast-disabled);
      }
    `,
  ];

  // TODO: assign with form etc.
  static readonly formAssociated = true;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeydown);
  }

  @query('uui-dropdown')
  dropdown!: UUIDropdownElement;

  private _open = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get open() {
    return this._open;
  }

  set open(newVal) {
    const oldVal = this._open;
    this._open = newVal;
    if (this.overflow && this.dropdown) {
      if (newVal) this.overflow.focus();
      else this.dropdown.focus();
    }
    this.requestUpdate('open', oldVal);
  }

  @property({ type: String })
  label = '';

  @property({ type: String })
  title = '';

  @property()
  placeholder = '';

  private _onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case keys.ARROW_UP: {
        e.preventDefault();
        if (!this.open) this.open = true;
        this.selectPreviousElement();
        break;
      }

      case keys.ARROW_DOWN: {
        e.preventDefault();

        if (!this.open) this.open = true;
        this.selectNextElement();
        break;
      }

      case keys.SPACE:
      case keys.ENTER: {
        e.preventDefault();
        this.open = !this.open;
        break;
      }

      case keys.ESCAPE: {
        e.preventDefault();
        if (this.open) this.open = false;
        break;
      }

      case keys.TAB: {
        if (this.open) this.open = false;
        break;
      }

      case keys.HOME: {
        this.selectIndex(0);
        break;
      }

      case keys.END: {
        this.selectIndex(this.listElements.length - 1);
        break;
      }
    }
  }

  render() {
    return html`
      <uui-dropdown
        .open=${this.open}
        same-width
        position="bottom"
        .title="${this.title}"
        tabindex="0"
        role="combobox"
        aria-controls="list"
      >
        <button
          id="selected-value"
          type="button"
          @click="${() => {
            console.log('click');
            this.open = !this.open;
          }}"
          aria-label="${this.label}"
        >
          ${this.selectedElement
            ? html`<span>${this.selectedElement.label}</span>`
            : html`<span id="placeholder">${this.placeholder}</span>`}
          <uui-caret id="caret" ?open=${this._open}></uui-caret>
        </button>

        <uui-overflow-container
          slot="dropdown"
          role="listbox"
          tabindex="${this.open ? '0' : '-1'}"
          aria-activedescendant="TODO"
          @change=${this.onListElementChange}
        >
          <slot @slotchange=${this.onSlotChange}></slot>
        </uui-overflow-container>
      </uui-dropdown>
    `;
  }
}
