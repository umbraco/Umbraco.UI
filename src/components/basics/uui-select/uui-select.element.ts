import { LitElement, html, css, property, query } from 'lit-element';
import { UUIDropdownElement } from '../uui-dropdown/uui-dropdown.element';
import { UUISelectListElement } from '../uui-select-list/uui-select-list.element';
import { UUISelectListEvent } from '../uui-select-list/UUISelectListEvent';

/**
 *  @element uui-select
 *  @slot - for stuff
 */

//TODO add label
export class UUISelectElement extends LitElement {
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

      slot:focus-within {
        border: 1px solid green;
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

      input {
        border: none;
        width: 80%;
        height: 100%;
        padding: 0.5em;
        box-sizing: border-box;
        font-family: inherit;
        background-color: var(--uui-interface-surface);
        font-size: 1rem;
        padding-left: 1em;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    //this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-controls', 'list');
    this.setAttribute('aria-expanded', `false`);
    this.setAttribute('aria-label', this.label);
  }

  @query('uui-dropdown')
  dropdown!: UUIDropdownElement;

  @query('uui-select-list')
  selectList!: UUISelectListElement;

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

  @property({ reflect: true })
  value = '';

  @property({ type: Boolean })
  autocomplete = false;

  @property({ type: String })
  label = 'label';

  @property({ type: String })
  title = 'title';

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
              <input
                role="textbox"
                type="text"
                slot="toggle"
                disabled
                .aria-label="${this.label}"
                .title="${this.title}"
                .value=${this.value}
              /><uui-carret slot="toggle" ?open=${this.isOpen}></uui-carret>
            `}

        <uui-overflow-container
          ><uui-select-list
            role="listbox"
            id="list"
            .title="${this.title}"
            .aria-label="${this.label}"
            @change="${(e: UUISelectListEvent) => {
              e.stopPropagation();
              this.value = this.selectList.value as string;
            }}"
          >
            <slot></slot> </uui-select-list
        ></uui-overflow-container>
      </uui-dropdown>
    `;
  }
}
