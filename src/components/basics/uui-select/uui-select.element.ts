import { html, css, property, query } from 'lit-element';
import { UUIDropdownElement } from '../uui-dropdown/uui-dropdown.element';
import { UUISingleSelectBaseElement } from './uui-single-select-base.element';

/**
 *  @element uui-select
 *  @slot - for stuff
 */

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const SPACE = ' ';
const ENTER = 'Enter';
const ESCAPE = 'Escape';
const TAB = 'Tab;';

//TODO add label
export class UUISelectElement extends UUISingleSelectBaseElement {
  static styles = [
    css`
      :host {
        font-family: inherit;
        --uui-select-widht: 200px;
        width: var(--uui-select-widht);
        display: inline-block;
        border: 1px solid var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius);
      }

      :host(:focus-within) {
        box-shadow: 0 0 2px 1px var(--uui-interface-border-focus);
      }

      uui-dropdown {
        width: 100%;
        height: 100%;
      }

      /* uui-dropdown:focus {
        outline: none;
      } */

      uui-overflow-container {
        min-width: var(--uui-select-widht);
        /* outline: none; */
      }

      uui-carret {
        display: inline-block;
        padding: var(--uui-size-base-unit);
      }

      #selected-value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: inherit;
        font-size: 1rem;
        padding-left: 1em;
      }

      input,
      #combo {
        display: inline-block;
        border: none;
        width: 80%;
        height: 100%;
        padding: 0.5em;
        box-sizing: border-box;
        font-family: inherit;
        background-color: var(--uui-interface-surface);
        font-size: 1rem;
        padding-left: 1em;
        outline: none;
      }
    `,
  ];

  static readonly formAssociated = true;

  // connectedCallback() {
  //   super.connectedCallback();
  //   this.setAttribute('tabindex', '0');
  //   this.setAttribute('role', 'combobox');
  //   this.setAttribute('aria-haspopup', 'listbox');
  //   this.setAttribute('aria-controls', 'list');
  //   this.setAttribute('aria-expanded', `false`);
  //   this.setAttribute('aria-label', this.label);
  // }

  constructor() {
    super();
    this.addEventListener('keydown', this._onKeydown);
  }

  // private _closeOnBlur() {
  //   if (this.isOpen) this.isOpen = false;
  // }

  @query('uui-dropdown')
  dropdown!: UUIDropdownElement;

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    this._isOpen = newVal;
    if (newVal) this.overflow.focus();
    else this.dropdown.focus();
    this.requestUpdate('isOpen', oldVal);
  }

  @property({ type: Boolean })
  autocomplete = false;

  @property({ type: String })
  label = '';

  @property({ type: String })
  title = '';

  private _onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case ARROW_UP: {
        e.preventDefault();
        if (!this.isOpen) this.isOpen = true;
        this._selectPreviousElement();
        break;
      }

      case ARROW_DOWN: {
        e.preventDefault();

        if (!this.isOpen) this.isOpen = true;
        this._selectNextElement();
        break;
      }

      case SPACE:
      case ENTER: {
        e.preventDefault();
        this.isOpen = !this.isOpen;
        break;
      }

      case ESCAPE: {
        e.preventDefault();
        if (this.isOpen) this.isOpen = false;
        break;
      }
    }
  }

  render() {
    return html`
      <uui-dropdown
        ?open=${this.isOpen}
        @close="${() => (this.isOpen = false)}"
        @open="${() => (this.isOpen = true)}"
        same-widht
        position="bottom"
        .title="${this.title}"
        tabindex="0"
        role="combobox"
        aria-haspopup="true"
        aria-controls="list"
        aria-autocomplete="none"
        aria-expanded="${this.isOpen}"
      >
        ${this.autocomplete
          ? html`<input
                type="text"
                slot="input"
                .value=${this.value}
                aria-label="${this.label}"
              /><uui-carret slot="toggle" ?open=${this.isOpen}></uui-carret>`
          : html`
              <div
                id="combo"
                type="text"
                aria-label="${this.label}"
                slot="toggle"
                .title="${this.title}"
              >
                ${this.value}
              </div>
              <uui-carret slot="toggle" ?open=${this.isOpen}></uui-carret>
            `}

        <uui-overflow-container
          role="listbox"
          id="list"
          tabindex="${this.isOpen ? '0' : '-1'}"
          .title="${this.title}"
          aria-label="${this.label}"
          aria-activedescendant="${this.selectedID}"
          @change=${this._handleSelectOnClick}
        >
          <slot></slot>
        </uui-overflow-container>
      </uui-dropdown>
    `;
  }
}
// /@blur=${this._closeOnBlur}
