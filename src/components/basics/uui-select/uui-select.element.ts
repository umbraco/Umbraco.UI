import { html, css, property, query } from 'lit-element';
import { UUIDropdownElement } from '../uui-dropdown/uui-dropdown.element';
import { UUISingleSelectBaseElement } from './uui-single-select-base.element';
import { UUISelectEvent } from './UUISelectEvent';

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

      uui-overflow-container {
        min-width: var(--uui-select-widht);
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
    // this.addEventListener('blur', this._closeOnBlur);
  }

  private _closeOnBlur = () => {
    console.log('blurrrr');
    this.isOpen = false;
  };

  @query('uui-dropdown')
  dropdown!: UUIDropdownElement;

  @query('uui-select-list')
  selectList!: UUISingleSelectBaseElement;

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    this._isOpen = newVal;
    this.requestUpdate('isOpen', oldVal).then(() =>
      this.setAttribute('aria-expanded', `${newVal}`)
    );
  }

  // @property({ reflect: true })
  // value = '';

  @property({ type: Boolean })
  autocomplete = false;

  @property({ type: String })
  label = 'label';

  @property({ type: String })
  title = 'title';

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
      >
        ${this.autocomplete
          ? html`<input
                type="text"
                slot="input"
                role="textbox"
                .value=${this.value}
                .aria-label="${this.label}"
              /><uui-carret slot="toggle" ?open=${this.isOpen}></uui-carret>`
          : html`
              <div
                id="combo"
                role="textbox"
                type="text"
                slot="toggle"
                tabindex="0"
                .aria-label="${this.label}"
                .title="${this.title}"
              >
                ${this.value}
              </div>
              <uui-carret slot="toggle" ?open=${this.isOpen}></uui-carret>
            `}

        <uui-overflow-container
          role="listbox"
          id="list"
          .title="${this.title}"
          .aria-label="${this.label}"
          @change=${(e: UUISelectEvent) => {
            e.stopPropagation();
            this.value = this.selectList.value as string;
          }}
        >
          <slot
            @slotchange=${() => {
              this.listElements = this.getlistElements();
            }}
            @change=${this._handleSelectOnClick}
          ></slot>
        </uui-overflow-container>
      </uui-dropdown>
    `;
  }
}
